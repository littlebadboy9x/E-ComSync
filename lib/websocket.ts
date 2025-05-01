import { Client, type IMessage } from "@stomp/stompjs"

type MessageHandler = (message: any) => void
type ConnectionHandler = () => void

class WebSocketService {
    private client: Client | null = null
    private subscriptions: Map<string, { id: string; handler: MessageHandler }> = new Map()
    private onConnectHandlers: ConnectionHandler[] = []
    private onDisconnectHandlers: ConnectionHandler[] = []
    private connected = false
    private userId: string | null = null

    constructor() {
        this.initializeClient()
    }

    private initializeClient() {
        this.client = new Client({
            brokerURL: `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${window.location.host}/ws`,
            connectHeaders: {},
            debug: (str) => {
                console.log("STOMP: " + str)
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        })

        this.client.onConnect = (frame) => {
            this.connected = true
            console.log("Connected to WebSocket")

            // Subscribe to user-specific topics
            if (this.userId) {
                this.subscribeToUserTopics()
            }

            // Call all connection handlers
            this.onConnectHandlers.forEach((handler) => handler())
        }

        this.client.onDisconnect = () => {
            this.connected = false
            console.log("Disconnected from WebSocket")

            // Call all disconnection handlers
            this.onDisconnectHandlers.forEach((handler) => handler())
        }

        this.client.onStompError = (frame) => {
            console.error("STOMP error", frame.headers, frame.body)
        }
    }

    public connect(userId?: string) {
        if (userId) {
            this.userId = userId
        }

        if (this.client && !this.connected) {
            this.client.activate()
        }
    }

    public disconnect() {
        if (this.client && this.connected) {
            this.client.deactivate()
        }
    }

    public subscribe(destination: string, callback: MessageHandler): string {
        if (!this.client || !this.connected) {
            throw new Error("WebSocket is not connected")
        }

        const subscription = this.client.subscribe(destination, (message: IMessage) => {
            const payload = JSON.parse(message.body)
            callback(payload)
        })

        const key = `sub-${Date.now()}-${Math.random()}`
        this.subscriptions.set(key, { id: subscription.id, handler: callback })

        return key
    }

    public unsubscribe(subscriptionKey: string) {
        const subscription = this.subscriptions.get(subscriptionKey)
        if (subscription && this.client) {
            this.client.unsubscribe(subscription.id)
            this.subscriptions.delete(subscriptionKey)
        }
    }

    public send(destination: string, body: any) {
        if (!this.client || !this.connected) {
            throw new Error("WebSocket is not connected")
        }

        this.client.publish({
            destination,
            body: JSON.stringify(body),
        })
    }

    public onConnect(handler: ConnectionHandler) {
        this.onConnectHandlers.push(handler)
        if (this.connected) {
            handler()
        }
    }

    public onDisconnect(handler: ConnectionHandler) {
        this.onDisconnectHandlers.push(handler)
    }

    private subscribeToUserTopics() {
        if (this.userId) {
            // Subscribe to user-specific notifications
            this.subscribe(`/user/${this.userId}/queue/notifications`, (notification) => {
                console.log("Received notification:", notification)
                // Dispatch event for notification
                const event = new CustomEvent("notification", { detail: notification })
                window.dispatchEvent(event)
            })

            // Subscribe to order updates
            this.subscribe(`/user/${this.userId}/queue/orders`, (orderUpdate) => {
                console.log("Received order update:", orderUpdate)
                // Dispatch event for order update
                const event = new CustomEvent("orderUpdate", { detail: orderUpdate })
                window.dispatchEvent(event)
            })
        }
    }
}

// Create a singleton instance
const webSocketService = new WebSocketService()
export default webSocketService
