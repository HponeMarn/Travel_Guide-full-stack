// public record BookingDto(int travellerCount,LocalDate bookingDate,Status status,String username,long destinationId) {}
export type BookingDto = {
    travellerCount: number;
    bookingDate: Date;
    status: string;
    username: string;
    destinationId: number;
    fees: number
}