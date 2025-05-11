export interface AgentProviderPort {
    fetchConversations(): Promise<string[]> //TODO: Modify response object for DTO
}