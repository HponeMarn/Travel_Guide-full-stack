import axios from "axios";
import type { CategoryDto } from "../dto/CategoryDto";
import type { DestinationDto } from "../dto/DestinationDto";
import type { BookingDto } from "../dto/BookingDto";
import type { BookingResponse } from "../dto/BookingResponse";

const APP_BASE_URL = "http://localhost:8080/api/traveller-guide";

//localhost:8080/api/traveller-guide/payment-destination

export const paymentDestination = (bookingResponse:BookingResponse) => axios.post(`${APP_BASE_URL}/payment-destination`,bookingResponse);

    //localhost:8080/api/traveller-guide/guide-net-worth/{username}
export const getGuideNetWorth = (username:string) => axios.get<number>(`${APP_BASE_URL}/guide-net-worth/${username}`);

export const cancelBooking = (id:number) => axios.delete(`${APP_BASE_URL}/cancel-booking/${id}`);

export const getBookingByGuideName = (guideName:string) => axios.get<BookingResponse[]>(`${APP_BASE_URL}/guide-bookings/${guideName}`);

export const getBookingByUsername = (username:string) => axios.get<BookingDto[]>(`${APP_BASE_URL}/list-bookings/${username}`);

export const acceptBooking = (id:number) => axios.put(`${APP_BASE_URL}/accept-booking/${id}`);

export const rejectBooking = (id:number) => axios.put(`${APP_BASE_URL}/reject-booking/${id}`);

export const listAllBooking = ()=>axios.get(`${APP_BASE_URL}/list-bookings`);

export const createBooking = (bookingDto:BookingDto) => axios.post(`${APP_BASE_URL}/create-booking`,bookingDto);

export const getPlacesByDestinationId = (id:number) =>
     axios.get(`${APP_BASE_URL}/list-places/${id}`);

export const createDestinationPlaces = (dataForm:FormData)=>
    axios.post(`${APP_BASE_URL}/create-destination-places`,dataForm);

export const deleteDestination = (id:number) => axios.delete(`${APP_BASE_URL}/delete-destination/${id}`);

export const getDestinationByGuideName = (username:string) => axios.get<DestinationDto[]>(`${APP_BASE_URL}/list-destinations/${username}`);

export const getAllDestinations = () => axios.get<DestinationDto[]>(`${APP_BASE_URL}/list-destinations`);

export const createDestination = (dataForm:FormData) =>
     axios.post(`${APP_BASE_URL}/create-destination`,dataForm);

export const getallCategories = () => axios.get<CategoryDto[]>(`${APP_BASE_URL}/list-categories`);

export const createCategory = (categoryDto:CategoryDto) => axios.post(`${APP_BASE_URL}/create-category`,categoryDto);