//  private Long destinationId;
//     private String title;
//     private String description;
//     private BigDecimal fees;
//     private String imageBase64;
//     private String category;

export type DestinationDto = { 
    destinationId?: number;
    title: string;
    description: string;
    fees: number;
    imageBase64: string;
    startDate: Date;
    endDate: Date;
    guideName: string;
    category: string;
    
}