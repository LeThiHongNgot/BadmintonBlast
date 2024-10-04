export interface StatisticalResult {
    totalBills: number;        
    completedBills: number;    
    totalRevenue: number;      
}
export interface StatisticalInvoice {
    totalInvoice: number;      
    completedInvoice: number;  
    totalRevenue: number;      
}
export interface ProductSalesDTO {
    productId?: number;        
    totalAmount: number;       
    totalQuantity: number;     
}
