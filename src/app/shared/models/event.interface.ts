import { BeaconI } from './beacon.interface';

export interface EventI{
	id?: string;
	title: string;
	siglas: string;
	descrip: string;
	topics: string;
	dateselect?: Date;
	date?: string;
	sala?: string;
	idsala?: string;
}