import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
   private readonly apiUrl = 'http://172.20.1.91:8000';
   private readonly adminUrl='/register/createAdmin';
   private readonly loginUrl='/register/login';
   private readonly addbookUrl='/book/addbook';
   private readonly getAllBook='/book/getAllBook';
   private readonly searchUrl='/book/search';
   private readonly addStudentUrl='/student/addStudent';
   private readonly getStudentByIdUrl='/student/getStudent';
   private readonly updateStudentUrl='/student/updateStudent';
   private readonly issueBookUrl='/issuebook/student';
   private readonly returnBookInformationUrl='/return/getdata';
   private readonly returnBookUrl='/return/returnBook';
   private readonly deleteBookUrl='/book/deleteBook';
   private readonly otpsentUrl='/register/getotp';
   private readonly verifyOtpUrl='/register/verifyotp';
   private readonly updatePasswordUrl='/register/updatepassword'; 
   private readonly verifyJwtUrl='/register/verifytoken';
  constructor() { }


  getAdminUrl():string{
    return this.apiUrl+this.adminUrl;
  }

  getLoginUrl():string{
    return `${this.apiUrl}${this.loginUrl}`
  }

  getAddbookUrl():string{
    return this.apiUrl+this.addbookUrl;
  }
 
  getAllBookUrl():string{
    return this.apiUrl+this.getAllBook;
  }

  getSearchUrl():string{
    return this.apiUrl+this.searchUrl;
  }
  
  getAddStudentUrl():string{
    return this.apiUrl+this.addStudentUrl;
  }

  getStudentIdUrl():string{
    return this.apiUrl+this.getStudentByIdUrl;
  }

  getUpdateStudentUrl():string{
    return this.apiUrl+this.updateStudentUrl;
  }

  getIssueBookUrl():string{
    return this.apiUrl+this.issueBookUrl;
  }

  getreturnBookInformationUrl():string{
    return this.apiUrl+this.returnBookInformationUrl;
  }

  getReturnBookUrl():string{
    return this.apiUrl+this.returnBookUrl;
  }

  getDeleteBookUrl():string{
    return this.apiUrl+this.deleteBookUrl;
  }

  getOtpSentUrl():String{
    return this.apiUrl+this.otpsentUrl;
  }

  getVerifyOtpUrl():string{
    return this.apiUrl+this.verifyOtpUrl;
  }

  getUpdatePasswordUrl():string{
    return this.apiUrl+this.updatePasswordUrl;
  }

  getVerifyJwtUrl(){
    return this.apiUrl+this.verifyJwtUrl;
  }
}
