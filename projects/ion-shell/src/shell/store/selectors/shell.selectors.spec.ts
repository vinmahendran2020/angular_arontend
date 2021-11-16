// import { IShellState } from '../../types';
// import * as selectors from './shell.selectors';

// describe('ShellSelector', () => {
//   it('testing selectShellState positions selector', () => {
//     const shellState = selectors.selectShellState({
//       router: {
//         state: {
//           root: {
//             params: {},
//             data: {},
//             url: [],
//             outlet: 'primary',
//             routeConfig: null,
//             queryParams: {},
//             firstChild: null,
//             children: [],
//           },
//           url: '/dashboard/position',
//         },
//         navigationId: 6,
//       },
//       dashboard: {
//         risk: {
//           form: {
//             participantId: {
//               type: 'string',
//               editable: true,
//               touched: false,
//               value: '1',
//               error: null,
//               async: true,
//               validatable: true,
//               validated: false,
//               validating: false,
//             },
//             collateralId: {
//               type: 'string',
//               editable: false,
//               touched: false,
//               value: '2',
//               error: null,
//               async: false,
//               validatable: true,
//               validated: true,
//               validating: false,
//             },
//           },
//           summary: {
//             participantId: '100',
//             collateralId: '200',
//             settlementBalance: 100,
//             netDepitCap: 200,
//             collateralMonitor: 300,
//             sppNetActivity: 400,
//           },
//           lastUpdated: new Date('12/10/2020'),
//           initialLoaded: null,
//           pageLoaded: null,
//         },
//         position: {
//           form: {
//             participantId: {
//               type: 'string',
//               editable: true,
//               touched: false,
//               value: '1',
//               error: null,
//               async: true,
//               validatable: true,
//               validated: false,
//               validating: false,
//             },
//             cusip: {
//               type: 'string',
//               editable: true,
//               touched: false,
//               value: '3',
//               error: null,
//               async: false,
//               validatable: true,
//               validated: true,
//               validating: false,
//             },
//             date: {
//               type: 'string',
//               editable: true,
//               touched: false,
//               value: '12/10/2020',
//               error: null,
//               async: false,
//               validatable: true,
//               validated: true,
//               validating: false,
//             },
//           },
//           summary: {
//             security: '1',
//             ticker: '2',
//             cusip: '3',
//             netAdditions: 100,
//             minimumAmount: 200,
//             memoSegregation: 300,
//             totalFreeExcess: 400,
//             pledged: 500,
//             totalPositions: 600,
//           },
//           dialog: {
//             cusip: false,
//           },
//           lastUpdated: new Date('11/10/2020'),
//           initialLoaded: null,
//           pageLoaded: null,
//         },
//         obligation: {
//           form: {
//             participantId: {
//               type: 'string',
//               editable: true,
//               touched: false,
//               value: '1',
//               error: null,
//               async: true,
//               validatable: true,
//               validated: false,
//               validating: false,
//             },
//           },
//           lastUpdated: new Date('10/10/2020'),
//           initialLoaded: null,
//           pageLoaded: null,
//           selection: {
//             itemId: '2',
//             pendingId: '3',
//             transactions: [
//               {
//                 transactionId: '1',
//                 cusip: '2',
//                 contra: 100,
//                 deliverReceiver: '3',
//                 quantity: 200,
//                 tradeAmount: 300,
//                 status: '4',
//                 activity: '5',
//                 source: '6',
//                 reason: '7',
//               },
//             ],
//             trades: [
//               {
//                 tradeId: '1',
//                 ticker: '2',
//                 cusip: '3',
//                 buySell: '4',
//                 quantity: 100,
//                 tradePrice: 200,
//                 tradeAmount: 300,
//                 settlementDate: '12/10/2020',
//                 market: 'AAPL',
//               },
//             ],
//           },
//           summary: {
//             cusip: '100',
//             sortBy: undefined,
//             longs: [
//               {
//                 netObligationId: '',
//                 securityName: '',
//                 cusip: '',
//                 ticker: '',
//                 isin: '',
//                 netQuantity: 100,
//                 netTradeAmount: 200,
//                 settlementValue: 300,
//                 settlementDate: '',
//                 closePrice: 400,
//                 settlementStatus: '',
//               },
//             ],
//             shorts: [
//               {
//                 netObligationId: '',
//                 securityName: '',
//                 cusip: '',
//                 ticker: '',
//                 isin: '',
//                 netQuantity: 100,
//                 netTradeAmount: 200,
//                 settlementValue: 300,
//                 settlementDate: '',
//                 closePrice: 400,
//                 settlementStatus: '',
//               },
//             ],
//           },
//           dialog: {
//             cusip: false,
//           },
//         },
//       },
//       shell: {
//         loadedAt: null,
//         participant: null,
//         schedule: {
//           netting: null,
//           cash: null,
//           security: null,
//           error: null,
//         },
//       },
//     } as { shell: IShellState });
//     expect(shellState).toEqual({
//       loadedAt: null,
//       participant: null,
//       schedule: {
//         netting: null,
//         cash: null,
//         security: null,
//         error: null,
//       },
//     });
//   });

//   it('testing selectLastUpdated risk lastUpdated selector', () => {
//     const lastUpdated = selectors.selectLastUpdated({
//       router: {
//         state: {
//           root: {
//             params: {},
//             data: {},
//             url: [],
//             outlet: 'primary',
//             routeConfig: null,
//             queryParams: {},
//             firstChild: null,
//             children: [],
//           },
//           url: '/dashboard/risk',
//         },
//         navigationId: 6,
//       },
//       dashboard: {
//         risk: {
//           form: {
//             participantId: {
//               type: 'string',
//               editable: true,
//               touched: false,
//               value: '1',
//               error: null,
//               async: true,
//               validatable: true,
//               validated: false,
//               validating: false,
//             },
//             collateralId: {
//               type: 'string',
//               editable: false,
//               touched: false,
//               value: '2',
//               error: null,
//               async: false,
//               validatable: true,
//               validated: true,
//               validating: false,
//             },
//           },
//           summary: {
//             participantId: '100',
//             collateralId: '200',
//             settlementBalance: 100,
//             netDepitCap: 200,
//             collateralMonitor: 300,
//             sppNetActivity: 400,
//           },
//           lastUpdated: new Date('12/10/2020'),
//           initialLoaded: null,
//           pageLoaded: null,
//         },
//       },
//       shell: {
//         loadedAt: null,
//         participant: null,
//         schedule: {
//           netting: null,
//           cash: null,
//           security: null,
//           error: null,
//         },
//       },
//     } as { shell: IShellState });
//     expect(lastUpdated).toEqual(new Date('12/10/2020'));
//   });

//   it('testing selectLastUpdated risk initialLoaded selector', () => {
//     const lastUpdated = selectors.selectLastUpdated({
//       router: {
//         state: {
//           root: {
//             params: {},
//             data: {},
//             url: [],
//             outlet: 'primary',
//             routeConfig: null,
//             queryParams: {},
//             firstChild: null,
//             children: [],
//           },
//           url: '/dashboard/risk',
//         },
//         navigationId: 6,
//       },
//       dashboard: {
//         risk: {
//           form: {
//             participantId: {
//               type: 'string',
//               editable: true,
//               touched: false,
//               value: '1',
//               error: null,
//               async: true,
//               validatable: true,
//               validated: false,
//               validating: false,
//             },
//             collateralId: {
//               type: 'string',
//               editable: false,
//               touched: false,
//               value: '2',
//               error: null,
//               async: false,
//               validatable: true,
//               validated: true,
//               validating: false,
//             },
//           },
//           summary: {
//             participantId: '100',
//             collateralId: '200',
//             settlementBalance: 100,
//             netDepitCap: 200,
//             collateralMonitor: 300,
//             sppNetActivity: 400,
//           },
//           lastUpdated: null,
//           initialLoaded: new Date('12/10/2020'),
//           pageLoaded: null,
//         },
//       },
//       shell: {
//         loadedAt: null,
//         participant: null,
//         schedule: {
//           netting: null,
//           cash: null,
//           security: null,
//           error: null,
//         },
//       },
//     } as { shell: IShellState });
//     expect(lastUpdated).toEqual(new Date('12/10/2020'));
//   });

//   it('testing selectLastUpdated deep risk lastUpdated selector', () => {
//     const lastUpdated = selectors.selectLastUpdated({
//       router: {
//         state: {
//           root: {
//             params: {},
//             data: {},
//             url: [],
//             outlet: 'primary',
//             routeConfig: null,
//             queryParams: {},
//             firstChild: null,
//             children: [],
//           },
//           url: '/dashboard/none/risk',
//         },
//         navigationId: 6,
//       },
//       dashboard: {
//         risk: {
//           form: {
//             participantId: {
//               type: 'string',
//               editable: true,
//               touched: false,
//               value: '1',
//               error: null,
//               async: true,
//               validatable: true,
//               validated: false,
//               validating: false,
//             },
//             collateralId: {
//               type: 'string',
//               editable: false,
//               touched: false,
//               value: '2',
//               error: null,
//               async: false,
//               validatable: true,
//               validated: true,
//               validating: false,
//             },
//           },
//           summary: {
//             participantId: '100',
//             collateralId: '200',
//             settlementBalance: 100,
//             netDepitCap: 200,
//             collateralMonitor: 300,
//             sppNetActivity: 400,
//           },
//           lastUpdated: new Date('12/10/2020'),
//           initialLoaded: null,
//           pageLoaded: null,
//         },
//       },
//       shell: {
//         loadedAt: null,
//         participant: null,
//         schedule: {
//           netting: null,
//           cash: null,
//           security: null,
//           error: null,
//         },
//       },
//     } as { shell: IShellState });
//     expect(lastUpdated).toEqual(new Date('12/10/2020'));
//   });

//   it('testing selectLastUpdated deep risk initialLoaded selector', () => {
//     const lastUpdated = selectors.selectLastUpdated({
//       router: {
//         state: {
//           root: {
//             params: {},
//             data: {},
//             url: [],
//             outlet: 'primary',
//             routeConfig: null,
//             queryParams: {},
//             firstChild: null,
//             children: [],
//           },
//           url: '/dashboard/none/risk',
//         },
//         navigationId: 6,
//       },
//       dashboard: {
//         risk: {
//           form: {
//             participantId: {
//               type: 'string',
//               editable: true,
//               touched: false,
//               value: '1',
//               error: null,
//               async: true,
//               validatable: true,
//               validated: false,
//               validating: false,
//             },
//             collateralId: {
//               type: 'string',
//               editable: false,
//               touched: false,
//               value: '2',
//               error: null,
//               async: false,
//               validatable: true,
//               validated: true,
//               validating: false,
//             },
//           },
//           summary: {
//             participantId: '100',
//             collateralId: '200',
//             settlementBalance: 100,
//             netDepitCap: 200,
//             collateralMonitor: 300,
//             sppNetActivity: 400,
//           },
//           lastUpdated: null,
//           initialLoaded: new Date('12/10/2020'),
//           pageLoaded: null,
//         },
//       },
//       shell: {
//         loadedAt: null,
//         participant: null,
//         schedule: {
//           netting: null,
//           cash: null,
//           security: null,
//           error: null,
//         },
//       },
//     } as { shell: IShellState });
//     expect(lastUpdated).toEqual(new Date('12/10/2020'));
//   });

//   it('testing selectLastUpdated shell loadedAt selector', () => {
//     const lastUpdated = selectors.selectLastUpdated({
//       router: {
//         state: {
//           root: {
//             params: {},
//             data: {},
//             url: [],
//             outlet: 'primary',
//             routeConfig: null,
//             queryParams: {},
//             firstChild: null,
//             children: [],
//           },
//           url: '/dashboard/none',
//         },
//         navigationId: 6,
//       },
//       dashboard: {
//         risk: {
//           form: {
//             participantId: {
//               type: 'string',
//               editable: true,
//               touched: false,
//               value: '1',
//               error: null,
//               async: true,
//               validatable: true,
//               validated: false,
//               validating: false,
//             },
//             collateralId: {
//               type: 'string',
//               editable: false,
//               touched: false,
//               value: '2',
//               error: null,
//               async: false,
//               validatable: true,
//               validated: true,
//               validating: false,
//             },
//           },
//           summary: {
//             participantId: '100',
//             collateralId: '200',
//             settlementBalance: 100,
//             netDepitCap: 200,
//             collateralMonitor: 300,
//             sppNetActivity: 400,
//           },
//           lastUpdated: null,
//           initialLoaded: null,
//           pageLoaded: null,
//         },
//       },
//       shell: {
//         loadedAt: new Date('12/10/2020'),
//         participant: null,
//         schedule: {
//           netting: null,
//           cash: null,
//           security: null,
//           error: null,
//         },
//       },
//     } as { shell: IShellState });
//     expect(lastUpdated).toEqual(new Date('12/10/2020'));
//   });
// });
