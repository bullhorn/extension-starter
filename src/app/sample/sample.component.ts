import { GetActivityService } from './../service/get-activity.service';
import { AppBridgeService } from './../service/app-bridge.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs/Subject';

// NG2
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// Vendor
// APP
import {
  StaticDataTableService,
  RemoteDataTableService,
  IDataTableColumn,
  IDataTablePaginationOptions,
  IDataTableService
} from 'novo-elements';

interface activity {
  type: string,
  owner: { id: number, firstName: string, lastName: string },
  action: string,
  dateAdded: number,
  body: string,
  contact: any,
  client: any,
  job: any,
}

@Component({
  selector: 'platform-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {
  globalSearchEnabled: boolean = true;
  //public result: any;
  public newActivity;
  basicRows: any[];
  public basicService: IDataTableService<any>;
  getRows: activity[];
  EntityID: string;
  public stat: StaticDataTableService<any>;
  public refreshSubject: Subject<boolean> = new Subject();
  public sharedColumns: IDataTableColumn<any>[] = [{
    //   id: 'owner',
    //   label: 'Owner',
    //   type: 'text',
    // },

    id: 'action',
    label: 'Details',
    type: 'text',
    filterable: true,
    sortable: true,

  },
  {
    id: 'dateAdded',
    label: 'Date Added',
    type: 'datetime',
    filterable: { type: 'date', allowCustomRange: true },
    sortable: true,
    width: 250
  }, {
    id: 'lookupref',
    label: 'Type',
    type: 'text',
    filterable:
    {
      type: 'select', options: [{ label: 'Sendout', value: 'Sendout' },
      { label: 'Appointment', value: 'Appointment' }, { label: 'Note', value: 'Note' }, { label: 'Shortlist', value: 'Shortlist' }, { label: 'Task', value: 'Task' }]
    },
    width: 130
  },
  {
    id: 'jobOrder',
    label: 'Job Order',
    type: 'link',
    format: '$title',
    handlers: {
      click: (row) => {
        if (row.row.jobOrder.id != 0) {
          console.log('this runs', row);
          this.bridgeService.execute((bridge) => {
            bridge.open({
              type: 'record',
              entityType: 'JobOrder',
              entityId: row.row.jobOrder.id
            })
          });
        }
      }
    },
    filterable: true,
    sortable: true,
    width: 250
  },
  {
    id: 'clientContact',
    label: 'Contact',
    type: 'link',
    format: '$firstName $lastName',
    handlers: {
      click: (row) => {
        if (row.row.clientContact.id != 0) {
          console.log('this runs', row);
          this.bridgeService.execute((bridge) => {
            bridge.open({
              type: 'record',
              entityType: 'ClientContact',
              entityId: row.row.clientContact.id
            })
          });
        }
      }
    },
    filterable: true,
    sortable: true,
    width: 250
  },
  //Binoculars
  // {
  //   id: 'preview',
  //     type: 'action',
  //       enabled: true,
  //         handlers: {
  //     click: (row) => {
  //       console.log('this runs', row);
  //       this.bridgeService.execute((bridge) => {
  //         bridge.open({
  //           type: 'record',
  //           entityType: 'ClientContact',
  //           entityId: row.row.clientContact.id
  //         })
  //       });
  //     }
  //   },
  //   action: {
  //     icon: 'preview',
  //     },
  // },
  {
    id: 'clientCorporation',
    label: 'Company',
    type: 'link',
    format: '$name',
    handlers: {
      click: (row) => {
        if (row.row.clientCorporation.id != 0) {
          console.log('this runs', row);
          this.bridgeService.execute((bridge) => {
            bridge.open({
              type: 'record',
              entityType: 'ClientCorporation',
              entityId: row.row.clientCorporation.id
            })
          });
        }
      }
    },
    filterable: true,
    sortable: true,
    width: 250
  },
  {
    id: 'user',
    label: 'Consulant',
    type: 'text',
    format: '$firstName $lastName',
    //filterable: true,
    sortable: true,
    width: 250
  },
    // {
    //   id: 'job',
    //   label: 'Job',
    //   type: 'link',
    // }
  ];

  public sharedDisplayColumns = [
    // 'type',
    // 'owner',
    //'preview',
    'lookupref',
    'dateAdded',
    'action',
    'clientContact',
    'jobOrder',
    'clientCorporation',
    'user'
    // 'body'
  ];
  public sharedPaginationOptions: IDataTablePaginationOptions = {
    theme: 'standard',
    pageSize: 10,
    pageSizeOptions: [10, 50, 100, 250, 500],
  };

  constructor(private route: ActivatedRoute, private bridgeService: AppBridgeService, private GetActivityService: GetActivityService) {
  }

  ngOnInit() {
    this.EntityID = this.route.snapshot.queryParamMap.get('EntityID');
    this.GetActivityService.getActivity(this.EntityID, this.bridgeService)
      .then(result => {
        console.log('thispromise', result);
        this.stat = new StaticDataTableService(result);

        // this.ref.detectChanges();
      });

    //GOLDEN CODE
    // this.GetActivityService.getAc()
    // .then( result => {
    //   this.stat = new StaticDataTableService<any>(result);
    //   console.log ('thispromise',result);
    //   console.log ('this.stat',this.stat);
    // });
    this.basicRows = [{
      type: "CV Send",
      owner: {
        "id": 5946,
        "firstName": "Sebastian",
        "lastName": "Woolston"
      },
      action: "CV Send",
      dateAdded: 1534513272687,
      body: "CV Sent",
      contact: {
        id: 9609,
        firstName: "Hamish",
        lastName: "Forbes"
      },
      client: {
        id: 290,
        name: "Riva"
      },
      job: {
        id: 1298,
        title: "Investor Liaison Officer"
      }
    },
    {
      type: "CV Send",
      owner: {
        "id": 5946,
        "firstName": "Sebastian",
        "lastName": "Woolston"
      },
      action: "CV Send",
      dateAdded: 1534513272687,
      body: "CV Sent",
      contact: {
        id: 9609,
        firstName: "Hamish",
        lastName: "Forbes"
      },
      client: {
        id: 290,
        name: "Riva"
      },
      job: {
        id: 1298,
        title: "Investor Liaison Officer"
      }
    }];
  }


  public log(event: { originalEvent: MouseEvent; row: any }): void {
    console.log('[DataTable] Event Triggered!', event); // tslint:disable-line
  }
}
