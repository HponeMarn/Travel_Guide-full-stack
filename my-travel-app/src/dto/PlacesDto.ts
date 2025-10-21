// @RequestParam(name = "id") int destinationId,@RequestParam(name = "placeName") String placeName,
//                                                           @RequestParam(name = "placeDescription")String placeDescription,
//             @RequestParam(value ="placeImage" )MultipartFile placeImage)

export type PlacesDto ={
    destinationId?: number;
    placeName: string;
    placeDescription: string;
    placeImageBase64: string;
    destinationTitle: string
    destinationImageBase64: string
    startDate: Date
    endDate: Date
    fees: number
    guideUsername: string

}