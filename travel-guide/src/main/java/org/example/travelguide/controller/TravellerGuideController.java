package org.example.travelguide.controller;

import lombok.RequiredArgsConstructor;
import org.example.travelguide.dto.*;
import org.example.travelguide.entity.Status;
import org.example.travelguide.service.TravellerGuideSevice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/traveller-guide")
public class TravellerGuideController {
    private final TravellerGuideSevice travellerGuideSevice;

    //localhost:8080/api/traveller-guide/payment-destination
    @PostMapping("/payment-destination")
    public String paymentDestination(@RequestBody BookingResponse bookingResponse) {
        return travellerGuideSevice.payment(bookingResponse);
    }

    //localhost:8080/api/traveller-guide/guide-net-worth/{username}
    record NetWorthResponse(double netWorth){}

    @GetMapping("/guide-net-worth/{username}")
    public NetWorthResponse getGuideNetWorth(@PathVariable String username){
        return new NetWorthResponse(travellerGuideSevice.guideNetWorth(username));
    }

    //localhost:8080/api/traveller-guide/cancel-booking/{bookingId}
    @DeleteMapping("/cancel-booking/{bookingId}")
    public String cancelBooking(@PathVariable long bookingId){
        return travellerGuideSevice.cancelBooking(bookingId);
    }

    @GetMapping("/guide-bookings/{guideName}")
    public List<BookingResponse> getBookingByGuideName(@PathVariable("guideName") String username){
        return travellerGuideSevice.getBookingByGuideName(username);
    }

    //localhost:8080/api/traveller-guide/list-bookings/{username}
    @GetMapping("/list-bookings/{username}")
    public List<BookingResponse> getBookingByUsername(@PathVariable String username) {
        return travellerGuideSevice.getBookingByUsername(username);
    }

    @PutMapping("/reject-booking/{bookingId}")
    public String rejectBooking(@PathVariable long bookingId){
        return travellerGuideSevice.rejectBooking(bookingId);
    }

    @PutMapping("/accept-booking/{bookingId}")
    public String acceptBooking(@PathVariable long bookingId){
        return travellerGuideSevice.acceptBooking(bookingId);
    }

    @GetMapping("/list-bookings")
    public List<BookingResponse> getAllBookings(){
        return travellerGuideSevice.getAllBookings();
    }

    //localhost:8080/api/traveller-guide/create-booking
    @PostMapping("/create-booking")
    public BookingResponse createBooking(@RequestBody BookingDto bookingDto){
        return travellerGuideSevice.createBooking(bookingDto);

    }

    //localhost:8080/api/traveller-guide/list-places/{destinationId}
    @GetMapping("/list-places/{destinationId}")
    public List<PlaceDto> findAllPlacesByDestinationId(@PathVariable Long destinationId){
        return travellerGuideSevice.findAllPlacesByDestinationId(destinationId);
    }

    @PostMapping("/create-destination-places")
    public ResponseEntity<String> createDestinationPlaces(@RequestParam(name = "destinationId",required = false) long destinationId,
                                                          @RequestParam(name = "placeName",required = false) String placeName,
                                                          @RequestParam(name = "placeDescription",required = false)String placeDescription,
                                                          @RequestParam(value ="placeImage" ,required = false)MultipartFile placeImage)throws  IOException {
        String responseString = travellerGuideSevice.createDestinationPlaces(destinationId,placeName,placeDescription,placeImage);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseString);
    }

//    localhost:8080/api/traveller-guide/delete-destination/{destinationId}
    @DeleteMapping("/delete-destination/{destinationId}")
    public ResponseEntity<String> deleteDestination(@PathVariable("destinationId") int destinationId){
        String responseString = travellerGuideSevice.deleteDestination(destinationId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(responseString);
    }

//    localhost:8080/api/traveller-guide/list-destinations
    @GetMapping("/list-destinations")
    public List<DestinationDto> getAllDestinations(){
        return travellerGuideSevice.getAllDestinations();
    }
//localhost:8080/api/traveller-guide/list-destinations/{username}
    @GetMapping("/list-destinations/{username}")
    public List<DestinationDto> getDestinationsByGuideUsername(@PathVariable String username){
        return travellerGuideSevice.getDestinationsByGuideUsername(username);
    }

    @GetMapping("/list-categories")
    public List<CategoryDto> getAllCategories(){
        return travellerGuideSevice.getAllCategories();
    }

    record CategoryRequest(String categoryName){}
    @PostMapping("/create-category")
    public ResponseEntity<String> createCategory(@RequestBody CategoryRequest categoryRequest){
        String responseString = travellerGuideSevice.createCategory(categoryRequest.categoryName());
        return ResponseEntity.status(HttpStatus.CREATED).body(responseString);
    }

    //localhost:8080/api/traveller-guide/create-destination
    @PostMapping("/create-destination")
    public ResponseEntity<String> createDestination(@RequestParam(name = "title",required = false) String title,
                                                    @RequestParam(name = "description",required = false) String description,
                                                    @RequestParam(name = "fees",required = false) double fees,
                                                    @RequestParam(name = "categoryName",required = false) String categoryName,
                                                    @RequestParam(name = "startDate",required = false) LocalDate startDate,
                                                    @RequestParam(name = "endDate",required = false) LocalDate endDate,
                                                    @RequestParam(value = "image",required = false) MultipartFile image,
                                                    @RequestParam(value = "guideName",required = false) String guideName) throws IOException {


        String responseString = travellerGuideSevice.createDestination(title,
                        description,
                        BigDecimal.valueOf(fees),
                        categoryName,
                        startDate,
                        endDate,
                guideName, image
                        );

        return ResponseEntity.status(HttpStatus.CREATED).body(responseString);
    }
}