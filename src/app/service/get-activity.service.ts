import { DataService } from './../tools/table/table.types';
import { Injectable } from '@angular/core';
import { AppBridge } from 'novo-elements';
import { AppBridgeService } from './app-bridge.service';


@Injectable()
export class GetActivityService {

  constructor(private appBridgeService: AppBridgeService) { }

  public getActivity(id: string, bs: AppBridgeService): Promise<Array<any>> {

    return new Promise((resolve, reject) => {
      let results = [];
      this.appBridgeService.execute((bridge) => {
        let sendouts: Promise<any> = bridge.httpGET('query/Sendout?where=candidate.id=' + id + '&sort=-dateAdded&fields=user,dateAdded,clientContact,clientCorporation,jobOrder&count=20');
        let notes: Promise<any> = bridge.httpGET('search/Note?query=candidateUserID:' + id + '&sort=-dateAdded&fields=comments,dateAdded,action,jobOrder(clientContact,clientCorporation),commentingPerson&count=20');
        let appointments: Promise<any> = bridge.httpGET('query/Appointment?where=candidateReference.id=' + id + '&fields=subject,dateAdded,type,dateBegin,clientContactReference(firstName,lastName,address,clientCorporation),jobOrder(id,title,address,clientCorporation),owner&start=0&sort=-dateAdded&count=20');
        let submissions: Promise<any> = bridge.httpGET('query/JobSubmission?where=candidate.id=' + id + '&sort=-dateAdded&fields=sendingUser,status,comments,dateAdded,jobOrder(clientContact,clientCorporation)&start=0&count=20');
        let tasks: Promise<any> = bridge.httpGET('query/Task?where=candidate.id=' + id + '&sort=-dateAdded&fields=dateAdded,owner,subject,dateBegin,description,clientContact,jobOrder&start=0&count=20');
        Promise.all([sendouts, notes, appointments, submissions, tasks]).then(result => {
          let total = []
          //SENDOUTS
          for (var element of result[0].data.data) {
            element['lookupref'] = 'Sendout';
            if (!element.jobOrder){
              element.jobOrder = {id:0,title:"Spec Submission"};
            }
          }
          //NOTES
          for (var element of result[1].data.data) {
            element['lookupref'] = 'Note';
            element['action'] = element['action'] //+' / ' + this.stripHtml(element['comments']);
            element.comments = this.stripHtml(element['comments']);
            if (element.jobOrder){
              element.clientContact = element.jobOrder.clientContact
              element.clientCorporation = element.jobOrder.clientCorporation
            }
            if (element.clientContact == null){
              element.clientContact = {firstName: '-',lastName:'',id:0};
            }
            if (element.jobOrder == null){
              element.jobOrder = {title:'-',id:0};
            }
            if (element.clientCorporation == null){
              element.clientCorporation = {name:'-',id:0};
            }
            element.user = element.commentingPerson;
          }
          //Appointments
          for (var element of result[2].data.data) {
            element['lookupref'] = 'Appointment';
            element.dateBegin=new Date (element.dateBegin).toLocaleString();
            element.user = element.owner;
            //element.action = element.subject;
            if (element.clientContactReference){
              element.clientContact = element.clientContactReference;
            element.clientCorporation = element.clientContactReference.clientCorporation;
            }
            if (element.clientContact == null){
              element.clientContact = {firstName: '-',lastName:'',id:0};
            }
            if (element.jobOrder == null){
              element.jobOrder = {title:'-',id:0};
            }
            if (element.clientCorporation == null){
              element.clientCorporation = {name:'-',id:0};
            }
            
          }
          //JobSubmission
          for (var element of result[3].data.data) {
            element['lookupref'] = 'Shortlist';
            element['clientCorporation'] = element.jobOrder.clientCorporation;
            element.clientContact = element.jobOrder.clientContact;
            element.user = element.sendingUser;
            element.action = element.status;
          }
          //TASK
          for (var element of result[4].data.data) {
            element['lookupref'] = 'Task';
            element.action=element.subject;
            element.user=element.owner;
            element.dateBegin=new Date (element.dateBegin).toLocaleString();
          }
          //Join all the results into a single array
          for (var action of result) {
            for (var element of action.data.data) {
              total.push(element);
            }
          }
          total = this.sortArray (total,'dateAdded',-1);
          resolve(total);
        });
      });
    });
  }

  //I copied this. No idea how it works
  public sortArray(array, property, direction) {
    direction = direction || 1;
    array.sort(function compare(a, b) {
        var comparison = 0;
        if (a[property] > b[property]) {
            comparison = 1 * direction;
        } else if (a[property] < b[property]) {
            comparison = -1 * direction;
        }
        return comparison;
    });
    return array; // Chainable
}
public stripHtml(html){
  // Create a new div element
  var temporalDivElement = document.createElement("div");
  // Set the HTML content with the providen
  temporalDivElement.innerHTML = html;
  // Retrieve the text property of the element (cross-browser support)
  return temporalDivElement.textContent || temporalDivElement.innerText || "";
}
}
