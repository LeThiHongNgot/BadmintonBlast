export interface IStatisticalResult {
    totalBills: number;        
    completedBills: number;    
    totalRevenue: number;      
}
export interface IStatisticalInvoice {
    totalInvoice: number;      
    completedInvoice: number;  
    totalRevenue: number;      
}
export interface IProductSalesDTO {
    productId?: number;        
    totalAmount: number;       
    totalQuantity: number;     
}
