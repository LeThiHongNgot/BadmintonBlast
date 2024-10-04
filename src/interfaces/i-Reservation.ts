export interface IReservation
{
 IdReservation: number;
 IdField: number;
 Idcustomer:number;
 Idhourlyrates?: number;
 Starttimerates?: string;
 Endtimerates?: string;
 Namecustomer?: string;
 Transactioncode?: string;
 Price?: number;
 Namefield?: string;
 Fieldstatus?: string;
 Missingslots?: number;
 Invoiceid?: number;

}
