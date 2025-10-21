package org.example.travelguide.service;

import lombok.RequiredArgsConstructor;
import org.example.travelguide.dao.*;
import org.example.travelguide.dto.*;
import org.example.travelguide.entity.*;
import org.example.travelguide.exception.BookingNotFoundException;
import org.example.travelguide.exception.DestinationNotFoundException;
import org.example.travelguide.exception.GuideNotFoundException;
import org.example.travelguide.exception.TravellerNotFoundException;
import org.example.travelguide.security.SecurityConfig;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TravellerGuideSevice {

    private final SecurityConfig securityConfig;
    private final GuideDao guideDao;
    private final TravellerDao travellerDao;
    private final SiteOwnerDao siteOwnerDao;
    private final DestinationDao destinationDao;
    private final CategoryDao categoryDao;
    private final BookingDao bookingDao;

//    record ForPayment(Long destinationId,BigDecimal destinationFee ){}
    @Transactional
    public String payment(BookingResponse bookingResponse ){
        Traveller traveller = travellerDao.findByUsername(bookingResponse.username()).orElseThrow(() -> new TravellerNotFoundException("Traveller with username '" + bookingResponse.username() + "' not found"));
      SiteOwner siteOwner = siteOwnerDao.findByUsername("richard").orElse(null);
        Guide guide = guideDao.findByUsername(bookingResponse.guideName()).orElse(null);
        double twentyPercent = bookingResponse.fees().doubleValue() * 0.2;

        double eightyPercent = bookingResponse.fees().doubleValue() * 0.8;

        if(Objects.nonNull(guide)){
            guide.setNetWorth(guide.getNetWorth().add(BigDecimal.valueOf(eightyPercent)));
        }

        if (Objects.nonNull(siteOwner)){
            siteOwner.setPlatFormFee(siteOwner.getPlatFormFee().add(BigDecimal.valueOf(twentyPercent)));
        }

        Booking booking = bookingDao.findById(bookingResponse.bookingId()).orElseThrow(() -> new BookingNotFoundException("Booking with id '" + bookingResponse.bookingId() + "' not found"));
        booking.setStatus(Status.CONFIRMED);
        bookingDao.save(booking);
        siteOwnerDao.save(siteOwner);
        guideDao.save(guide);
        return "successfully paid";
    }

    public double guideNetWorth(String username){
        Guide guide = guideDao.findByUsername(username).orElseThrow(() -> new GuideNotFoundException("Guide with username '" + username + "' not found"));
        return guide.getNetWorth().doubleValue();
    }

    public String cancelBooking(long id) {
        if (!bookingDao.existsById(id)) {
            throw new BookingNotFoundException("Booking with id '" + id + "' not found");
        }
        bookingDao.deleteById(id);
        return "Booking cancelled successfully.";
    }



    public List<BookingResponse> getBookingByGuideName(String username){
        return bookingDao.findBookingByGuideName(username);
    }

    public List<BookingResponse> getBookingByUsername(String username) {
        return bookingDao.findBookingByUsername(username);
    }

    public String rejectBooking(long bookingId){

        Booking booking = bookingDao.findById(bookingId)
                .orElseThrow(() -> new BookingNotFoundException("Booking with id '" + bookingId + "' not found"));
        booking.setStatus(Status.REJECTED);
//        booking.setId(bookingId);
        bookingDao.save(booking);
        return "Booking status updated successfully.";
    }

    public String acceptBooking(long bookingId){
        Booking booking = bookingDao.findById(bookingId)
                .orElseThrow(() -> new BookingNotFoundException("Booking with id '" + bookingId + "' not found"));
        booking.setStatus(Status.ACCEPTED);
        bookingDao.save(booking);
        return "Booking status updated successfully.";
    }

    public BookingResponse createBooking(BookingDto bookingDto ) {
        Traveller traveller = travellerDao.findByUsername(bookingDto.username())
                .orElseThrow(() -> new TravellerNotFoundException("Traveller with username '" + bookingDto.username() + "' not found"));
        String travellerName = traveller.getUsername();
        Destination destination = destinationDao.findById(bookingDto.destinationId())
                .orElseThrow(() -> new DestinationNotFoundException("Destination '" + bookingDto.destinationId() + "' not found"));
        String destinatinName = destination.getTitle();
        Booking booking = new Booking();

        booking.setTravellerCount(bookingDto.travellerCount());
        booking.setBookingDate(LocalDate.now());
        booking.setStatus(Status.PENDING); // safer than valueOf("PENDING")
        booking.setFees(bookingDto.fees());
        traveller.addBooking(booking);
        destination.addBooking(booking);


//        bookingDao.save(booking);

        Booking booking1 = bookingDao.save(booking);
        return new BookingResponse(booking1.getId(),booking1.getTravellerCount(),booking1.getBookingDate(),booking1.getStatus(),travellerName,destinatinName,destination.getGuide().getUsername(),booking1.getFees(),destination.getId());
    }

    public List<PlaceDto> findAllPlacesByDestinationId(Long destinationId){
        return destinationDao.findAllPlacesByDestinationId(destinationId);
    }

    @Transactional
    public String createDestinationPlaces(Long destinationId,String placeName,
                                          String placeDescription,
                                          MultipartFile placeImage) throws  IOException {
        Destination destination = destinationDao.findById(destinationId).orElseThrow(() -> new DestinationNotFoundException(destinationId +"not found"));

        destination.addDestinationPalace(placeName,placeDescription,placeImage.getBytes());
        destination.setId((long) destinationId);
        destinationDao.save(destination);

        return "Destination %s successfully created.".formatted(destinationId);


    }

    public String deleteDestination(long destinationId){
        if(destinationDao.existsById(destinationId)){
            destinationDao.deleteById(destinationId);
            return "Destination %s successfully deleted.".formatted(destinationId);
        }
        throw  new DestinationNotFoundException(destinationId +"not found");
    }

    public List<DestinationDto> getAllDestinations(){
        return destinationDao.findAllDestinations();
    }

    public List<DestinationDto> getDestinationsByGuideUsername(String username){
        return destinationDao.findDestinationsByGuideUsername(username);
    }

    public String createCategory(String categoryName){
        if(categoryName == null || categoryName.isEmpty()){
            throw new IllegalArgumentException("Category name is required");
        }
        Category category = new Category();

        category.setCategoryName(categoryName);
        categoryDao.save(category);
        return "Category %s successfully created.".formatted(categoryName);
    }

    public List<CategoryDto> getAllCategories(){
        return categoryDao.findAll().stream().map(this::toDto).toList();
    }

    public CategoryDto toDto(Category category){
        return new CategoryDto(category.getId(),category.getCategoryName());
    }


    @Transactional
    public String createDestination(String title,
                                    String description,
                                    BigDecimal fees,
                                    String categoryName,
                                    LocalDate startDate,
                                    LocalDate endDate,
                                    String guideName,
                                    MultipartFile image) throws IOException {
        Category category = categoryDao.findByCategoryName(categoryName).orElse(null);
        if (Objects.isNull(category)){
            category = new Category();
            category.setCategoryName(categoryName);
        }
        Guide guide = guideDao.findByUsername(guideName).orElse(null);
        if (Objects.isNull(guide)){
            guide = new Guide();
            guide.setUsername(guideName);
        }
        Destination destination = new Destination();
        destination.setTitle(title);
        destination.setDescription(description);
        destination.setFees(fees);
        destination.setStartDate(startDate);
        destination.setEndDate(endDate);

        if(Objects.nonNull(image)) {
            destination.setImage(image.getBytes());
        }
        guide.addDestination(destination);
        category.addDestination(destination);
        destinationDao.save(destination);

        return  "%s destination successfully created."
                .formatted(title);
    }


    public List<BookingResponse> getAllBookings() {
        return bookingDao.findAllBooking();
    }
}
