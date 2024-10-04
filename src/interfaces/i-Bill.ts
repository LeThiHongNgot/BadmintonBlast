export interface IBill
{
    idbill: number;                   
    idcustomer?: number;                
    dateorder?: Date;                  
    namecustomer?: string;              
    phone?: string;                     
    address?: string;                   
    totalamount?: number;               
    status?: number;                   
    pay?: string;                       
    transactioncode?: string;           
    message?: string;                   
    coupon?: number;                    
    idcoupon: number;   
}
