
export type BookingResponse ={
    bookingId: number,
    travellerCount: number,
    bookingDate: Date,
    status?: string,
    username: string,
    title: string
    guideName: string,
    fees: number,
    destinationId: number
}