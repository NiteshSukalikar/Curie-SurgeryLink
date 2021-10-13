import { Injectable } from '@angular/core';
import { CSVRecord } from 'src/app/shared/models/CSVModel';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  isValidFileType(fileName: any, fileType: any) {
    let extentionLists: any = {
      video: [],
      image: [],
      pdf: [],
      excel: [],
      xml: [],
    };
    let isValidType = false;
    extentionLists.excel = ['csv'];
    let fileExtension = fileName.name.split('.').pop().toLowerCase();
    isValidType = extentionLists[fileType].indexOf(fileExtension) > -1;
    return isValidType;
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  getDataRecordsArrayFromCSVFile(
    csvRecordsArray: any,
    headerLength: any,
    fileName: any
  ) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.id = curruntRecord[0].trim();
        csvRecord.description = curruntRecord[1].trim();
        csvRecord.discount = curruntRecord[2].trim();
        csvRecord.amount = curruntRecord[3].trim();
        csvRecord.price = curruntRecord[4].trim();
        // //csvRecord.mobile = curruntRecord[5].trim();
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }
}
