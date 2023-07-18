import {FC, Suspense} from 'react'
import {Route, Routes, Navigate, Outlet} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import {PageLink, PageTitle} from '../../_metronic/layout/core'
import {Approval} from '../modules/production/components/processes/payroll/Approval'
import {CheckTax} from '../modules/production/components/processes/payroll/CheckTax'
import {Journals} from '../modules/production/components/processes/payroll/Journal'
import {ProjectSheets} from '../modules/production/components/processes/payroll/ProjectSheet'
import {Payrun} from '../modules/production/components/processes/payroll/Payrun'
import {AllReports} from '../modules/production/components/report/AllReports'

import {HRDashboardPage} from '../pages/dashboard/HumanResourceDashBoard'
import {HRDashboardWrapper} from '../pages/dashboard/HumanResourceDashBoard'
import {PayrollDashboardWrapper} from '../pages/dashboard/PayrollDashBoard'
import PayrollPAYEReport from '../modules/production/components/report/PayrollPAYEReport'
import BenefitTransactionInputReport from '../modules/production/components/report/BenefitTransactionInputReport'
import DeductionTransactionInputReport from '../modules/production/components/report/DeductionTransactionInputReport'

import HumanRessourceReport from '../modules/production/components/report/HumanRessourceReport'
import PayrollLoansDetailsReport from '../modules/production/components/report/PayrollLoansDetailsReport'
import PayrollSSNITReport from '../modules/production/components/report/PayrollSSNITReport'
import SavSchemeTransactionInputReport from '../modules/production/components/report/SavSchemeTransactionInputReport'
import {EmployeeReportPage} from '../modules/production/components/report/EmployeeReportPage'
import {PayrollReportPage} from '../modules/production/components/report/PayrollReportPage'
import {HrReportPage} from '../modules/production/components/report/HrReportPage'
import EmployeeAgeRangeReport from '../modules/production/components/report/EmployeeAgeRangeReport'
import EmployeeListReport from '../modules/production/components/report/EmployeeListReport'
import EmployeeAgeSummaryReport from '../modules/production/components/report/EmployeeAgeSummaryReport'
import EmployeeFamilyReport from '../modules/production/components/report/EmployeeFamilyReport'
import EmployeeFamilySummaryReport from '../modules/production/components/report/EmployeeFamilySummaryReport'
import EmployeeDivisionReport from '../modules/production/components/report/EmployeeDivisionReport'
import EmployeeDivisionSummaryReport from '../modules/production/components/report/EmployeeDivisionSummaryReport'
import LeaveEmployeeReport from '../modules/production/components/report/LeaveEmployeeReport'
import LeaveSummaryReport from '../modules/production/components/report/LeaveSummaryReport'
import NoteCategoryReport from '../modules/production/components/report/NoteCategoryReport'
import LeaveDepartmentReport from '../modules/production/components/report/LeaveDepartmentReport'
import NotesEmployeeReport from '../modules/production/components/report/NotesEmployeeReport'
import NotesSummaryReport from '../modules/production/components/report/NotesSummaryReport'
import RecruitmentSelectionReferenceReport from '../modules/production/components/report/RecruitmentSelectionReferenceReport'
import RecruitmentSelectJobTitleRepor from '../modules/production/components/report/RecruitmentSelectJobTitleRepor'
import AppraisalPerformanceByAppraisalTypeReport from '../modules/production/components/report/AppraisalPerformanceByAppraisalTypeReport'
import AppraisalPerformanceByEmployeeReport from '../modules/production/components/report/AppraisalPerformanceByEmployeeReport'
import CompensationBenefitByEmployeeReport from '../modules/production/components/report/CompensationBenefitByEmployeeReport'
import CompensationBenefitByDepartmentReport from '../modules/production/components/report/CompensationBenefitByDepartmentReport'
import CompensationBenefitByJobTitleReport from '../modules/production/components/report/CompensationBenefitByJobTitleReport'
import TrainingDevelopmentByReferenceReport from '../modules/production/components/report/TrainingDevelopmentByReferenceReport'
import TrainingDevelopmentBySummaryReport from '../modules/production/components/report/TrainingDevelopmentBySummaryReport'
import TrainingDevelopmentByTrainingTypeReport from '../modules/production/components/report/TrainingDevelopmentByTrainingTypeReport'
import MedicalEmployeeReport from '../modules/production/components/report/MedicalEmployeeReport'
import MedicalTypeReport from '../modules/production/components/report/MedicalTypeReport'
import MedicalSummaryReport from '../modules/production/components/report/MedicalSummaryReport'
import {WalkIn} from '../modules/production/components/frontOffice/walkIn/WalkIn'
import {ReservationList} from '../modules/production/components/frontOffice/reservationList/reservationList'
import {Reservation} from '../modules/production/components/frontOffice/reservation/Reservation'
import {ReservationForm} from '../modules/production/components/frontOffice/reservation/ReservationForm'
import {ReservationDetails} from '../modules/production/components/frontOffice/reservation/ReservationDetails'
import {Guests} from '../modules/production/components/grm/Guests'
import {GuestMultiTabForm} from '../modules/production/components/guestsFormEntry/GuestFormEntry'
import {WalkInPlanning} from '../modules/production/components/frontOffice/walkIn/WalkInPlanning'
import {RoomType} from '../modules/production/components/setup/rooms/roomType'
import {RoomTypeForm} from '../modules/production/components/setup/rooms/roomTypeForm'
import {Rooms} from '../modules/production/components/setup/rooms/rooms'
import {RoomDetails} from '../modules/production/components/setup/rooms/roomDetails'
import {RoomForm} from '../modules/production/components/setup/rooms/roomForm'
import FileUploadForm from '../modules/production/components/guestsFormEntry/FileUploadForm'
import {NotesForm} from '../modules/production/components/grm/notesFormEntry'
import {Notes} from '../modules/production/components/grm/notes'
import {Category} from '../modules/production/components/setup/services/Category'
import {Details} from '../modules/production/components/setup/services/Details'
import {HouseKeeping} from '../modules/production/components/setup/housekeeping/housekeeping'
import {Housekeepingitems} from '../modules/production/components/setup/housekeeping/housekeepingitems'

const accountBreadCrumbs: Array<PageLink> = [
  {
    title: '',
    path: '/cycle_details/cycle-details',
    isSeparator: false,
    isActive: false,
  },
]

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/hr-dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        {/* <Route path='dashboard' element={<DashboardWrapper />} /> */}
        <Route path='payroll-dashboard' element={<PayrollDashboardWrapper />} />
        <Route path='hr-dashboard' element={<HRDashboardWrapper />} />

        {/* Employee  */}

        {/* <Route
         path='employee/*'
         element={
          
           <SuspensedView>
            <PageTitle breadcrumbs={accountBreadCrumbs}>All Employees</PageTitle>
             <Employee />
           </SuspensedView>
         }
        /> */}
        <Route
          path='frontOffice/walkIn/*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Front Office</PageTitle>
              <WalkInPlanning />
            </SuspensedView>
          }
        />
        <Route
          path='frontOffice/reservation/*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Reservation</PageTitle>
              <Reservation />
            </SuspensedView>
          }
        />
        <Route
          path='frontOffice/reservation/reservationForm'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Reservation Form</PageTitle>
              <ReservationForm />
            </SuspensedView>
          }
        />
        <Route
          path='frontOffice/reservation/reservationDetails/:id'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Reservation Details</PageTitle>
              <ReservationDetails />
            </SuspensedView>
          }
        />
        <Route
          path='frontOffice/reservationList/*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Reservation List</PageTitle>
              <ReservationList />
            </SuspensedView>
          }
        />

        <Route
          path='grm/guests/'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Guests</PageTitle>
              <Guests />
            </SuspensedView>
          }
        />
        <Route
          path='guest-form/*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Guest Form</PageTitle>
              {/* <FileUploadForm /> */}
              <GuestMultiTabForm />
            </SuspensedView>
          }
        />
        <Route
          path='/notes-form/:id'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Guest Note</PageTitle>
              {/* <FileUploadForm /> */}
              <NotesForm />
            </SuspensedView>
          }
        />
        <Route
          path='grm/Notes/'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Guest Note</PageTitle>
              {/* <FileUploadForm /> */}
              <Notes />
            </SuspensedView>
          }
        />

        <Route
          path='roomType/*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Room Type</PageTitle>
              <RoomType />
            </SuspensedView>
          }
        />
        {/* <Route
         path='/rooms'
         element={
          
           <SuspensedView>
            <PageTitle breadcrumbs={accountBreadCrumbs}>Rooms</PageTitle>
             <Rooms />
           </SuspensedView>
         }
        /> */}
        <Route
          path='/roomTypeForm'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>New Room Type</PageTitle>
              <RoomTypeForm />
            </SuspensedView>
          }
        />
        <Route
          path='/services/category'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Category</PageTitle>
              <Category />
            </SuspensedView>
          }
        />
        <Route
          path='/services/details/:id'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Details</PageTitle>
              <Details />
            </SuspensedView>
          }
        />
        <Route
          path='/roomsForm/:id'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>New Room Type</PageTitle>
              <RoomForm />
            </SuspensedView>
          }
        />
        <Route
          path='/rooms/:id'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Rooms</PageTitle>
              <Rooms />
            </SuspensedView>
          }
        />
        <Route
          path='/roomDetails'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Room Details</PageTitle>
              <RoomDetails />
            </SuspensedView>
          }
        />
        <Route
          path='/housekeeping'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>House Keeping</PageTitle>
              <HouseKeeping />
            </SuspensedView>
          }
        />
        <Route
          path='/housekeeping/:id'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>House Keeping Items</PageTitle>
              <Housekeepingitems />
            </SuspensedView>
          }
        />
        {/* <Route
         path='employee-form/*'
         element={
          
           <SuspensedView>
            <PageTitle breadcrumbs={accountBreadCrumbs}>Employee Entries</PageTitle>
             <MultiTabForm />
           </SuspensedView>
         }
        /> */}
        {/* <Route
         path='employee-edit-form/:id'
         element={
          
           <SuspensedView>
            <PageTitle breadcrumbs={accountBreadCrumbs}>Employee Entries</PageTitle>
             <EmployeeEditForm />
           </SuspensedView>
         }
        /> */}
        {/* <Route
         path='employee-details/:id'
         element={
          
           <SuspensedView>
            <PageTitle breadcrumbs={accountBreadCrumbs}>Employee Details</PageTitle>
             <EmplyeeDetails />
           </SuspensedView>
         }
        /> */}
        {/* All Reports  */}

        <Route
          path='all-reports/*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Reports</PageTitle>
              <AllReports />
            </SuspensedView>
          }
        />
        <Route
          path='employee-report-page/*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Employee Reports</PageTitle>
              <EmployeeReportPage />
            </SuspensedView>
          }
        />
        <Route
          path='hr-report-page/*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Human Resource Reports</PageTitle>
              <HrReportPage />
            </SuspensedView>
          }
        />
        <Route
          path='payroll-report-page/*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Payroll Reports</PageTitle>
              <PayrollReportPage />
            </SuspensedView>
          }
        />
        {/* Transaction > HR Routes  */}

        {/* <Route
         path='transaction/hr/recruitment-selection*'
         element={
           <SuspensedView>
            <PageTitle breadcrumbs={accountBreadCrumbs}>Recruitment and Selections</PageTitle>
             <RecruitmentSelection />
           </SuspensedView>
         }
        /> */}
        {/* <Route
         path='transaction/hr/compensation-benefit*'
         element={
           <SuspensedView>
            <PageTitle breadcrumbs={accountBreadCrumbs}>Compensation and Benefits</PageTitle>
             <CompensationBenefit />
           </SuspensedView>
         }
        /> */}
        {/* <Route
         path='transaction/payroll/non-recurrent*'
         element={
          
           <SuspensedView>
            <PageTitle breadcrumbs={accountBreadCrumbs}>Non-Recurrents</PageTitle>
             <NonRecurrent />
           </SuspensedView>
         }
        /> */}
        {/* <Route
         path='transaction/payroll/saving-schemes*'
         element={
          
           <SuspensedView>
            <PageTitle breadcrumbs={accountBreadCrumbs}>Saving Schemes</PageTitle>
             <SavingSchemes />
           </SuspensedView>
         }
        /> */}
        {/* <Route
         path='transaction/payroll/salary-upgrade*'
         element={
           <SuspensedView>
            <PageTitle breadcrumbs={accountBreadCrumbs}>Salary Upgrade</PageTitle>
             <SalaryUploads />
           </SuspensedView>
         }
        /> */}
        {/* <Route
         path='transaction/payroll/relief-rebate*'
         element={
          
           <SuspensedView>
            <PageTitle breadcrumbs={accountBreadCrumbs}>Relief and Rebate Input</PageTitle>
             <ReliefRebate />
           </SuspensedView>
         }
        /> */}

        {/* Processes > HR Routes  */}
        {/* <Route
         path='transaction/payroll/relief-rebate*'
         element={
          
           <SuspensedView>
            <PageTitle breadcrumbs={accountBreadCrumbs}>Relief and Rebate Input</PageTitle>
             <ReliefRebate />
           </SuspensedView>
         }
        /> */}

        {/* Processes > Payroll Routes  */}
        <Route
          path='processes/payroll/approval*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Approvals</PageTitle>
              <Approval />
            </SuspensedView>
          }
        />
        <Route
          path='processes/payroll/check-tax*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Check Taxes</PageTitle>
              <CheckTax />
            </SuspensedView>
          }
        />

        <Route
          path='processes/payroll/journal*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Journals </PageTitle>
              <Journals />
            </SuspensedView>
          }
        />

        <Route
          path='processes/payroll/project-sheets-input*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Project Sheets and Inputs </PageTitle>
              <ProjectSheets />
            </SuspensedView>
          }
        />
        <Route
          path='processes/payroll/payrun*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Payruns </PageTitle>
              <Payrun />
            </SuspensedView>
          }
        />

        {/* All reports routes */}
        <Route
          path='report/payrollPAYEReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Payroll PAYE Reports</PageTitle>
              <PayrollPAYEReport />
            </SuspensedView>
          }
        />
        <Route
          path='report/BenefitTransactionInputReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>BenefitTransactionInputReport</PageTitle>
              <BenefitTransactionInputReport />
            </SuspensedView>
          }
        />
        <Route
          path='report/DeductionTransactionInputReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>
                DeductionTransactionInputReport
              </PageTitle>
              <DeductionTransactionInputReport />
            </SuspensedView>
          }
        />
        <Route
          path='EmployeeAgeRangeReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Employee Age Range Report</PageTitle>
              <EmployeeAgeRangeReport />
            </SuspensedView>
          }
        />
        <Route
          path='EmployeeListReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>EmployeeListReport</PageTitle>
              <EmployeeListReport />
            </SuspensedView>
          }
        />
        <Route
          path='EmployeeAgeSummaryReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>EmployeeAgeSummaryReport</PageTitle>
              <EmployeeAgeSummaryReport />
            </SuspensedView>
          }
        />
        <Route
          path='report/HumanRessourceReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>HumanRessourceReport</PageTitle>
              <HumanRessourceReport />
            </SuspensedView>
          }
        />
        <Route
          path='EmployeeFamilyReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>EmployeeFamilyReport</PageTitle>
              <EmployeeFamilyReport />
            </SuspensedView>
          }
        />
        <Route
          path='EmployeeFamilySummaryReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>
                Employee Family Member Summary Report
              </PageTitle>
              <EmployeeFamilySummaryReport />
            </SuspensedView>
          }
        />
        <Route
          path='EmployeeDivisionReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Employee Division Report</PageTitle>
              <EmployeeDivisionReport />
            </SuspensedView>
          }
        />
        <Route
          path='EmployeeDivisionSummaryReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>
                Employee Division Summary Report
              </PageTitle>
              <EmployeeDivisionSummaryReport />
            </SuspensedView>
          }
        />
        <Route
          path='LeaveEmployeeReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>LeaveEmployeeReport</PageTitle>
              <LeaveEmployeeReport />
            </SuspensedView>
          }
        />
        <Route
          path='LeaveSummaryReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>LeaveSummaryReport</PageTitle>
              <LeaveSummaryReport />
            </SuspensedView>
          }
        />
        <Route
          path='LeaveDepartmentReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>LeaveDepartmentReport</PageTitle>
              <LeaveDepartmentReport />
            </SuspensedView>
          }
        />
        <Route
          path='NoteCategoryReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>NoteCategoryReport</PageTitle>
              <NoteCategoryReport />
            </SuspensedView>
          }
        />
        <Route
          path='NotesEmployeeReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>NotesEmployeeReport</PageTitle>
              <NotesEmployeeReport />
            </SuspensedView>
          }
        />
        <Route
          path='NotesSummaryReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>NotesSummaryReport</PageTitle>
              <NotesSummaryReport />
            </SuspensedView>
          }
        />
        <Route
          path='RecruitmentSelectionReferenceReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>
                RecruitmentSelectionReferenceReport
              </PageTitle>
              <RecruitmentSelectionReferenceReport />
            </SuspensedView>
          }
        />
        <Route
          path='RecruitmentSelectJobTitleRepor*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>RecruitmentSelectJobTitleRepor</PageTitle>
              <RecruitmentSelectJobTitleRepor />
            </SuspensedView>
          }
        />
        <Route
          path='AppraisalPerformanceByAppraisalTypeReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>
                AppraisalPerformanceByAppraisalTypeReport
              </PageTitle>
              <AppraisalPerformanceByAppraisalTypeReport />
            </SuspensedView>
          }
        />
        <Route
          path='AppraisalPerformanceByEmployeeReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>
                AppraisalPerformanceByEmployeeReport
              </PageTitle>
              <AppraisalPerformanceByEmployeeReport />
            </SuspensedView>
          }
        />
        <Route
          path='CompensationBenefitByEmployeeReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>
                CompensationBenefitByEmployeeReport
              </PageTitle>
              <CompensationBenefitByEmployeeReport />
            </SuspensedView>
          }
        />
        <Route
          path='CompensationBenefitByDepartmentReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>
                CompensationBenefitByDepartmentReport
              </PageTitle>
              <CompensationBenefitByDepartmentReport />
            </SuspensedView>
          }
        />
        <Route
          path='CompensationBenefitByJobTitleReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>
                CompensationBenefitByJobTitleReport
              </PageTitle>
              <CompensationBenefitByJobTitleReport />
            </SuspensedView>
          }
        />
        <Route
          path='TrainingDevelopmentByReferenceReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>
                TrainingDevelopmentByReferenceReport
              </PageTitle>
              <TrainingDevelopmentByReferenceReport />
            </SuspensedView>
          }
        />
        <Route
          path='TrainingDevelopmentBySummaryReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>
                TrainingDevelopmentBySummaryReport
              </PageTitle>
              <TrainingDevelopmentBySummaryReport />
            </SuspensedView>
          }
        />
        <Route
          path='TrainingDevelopmentByTrainingTypeReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>
                TrainingDevelopmentByTrainingTypeReport
              </PageTitle>
              <TrainingDevelopmentByTrainingTypeReport />
            </SuspensedView>
          }
        />
        <Route
          path='MedicalEmployeeReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>MedicalEmployeeReport</PageTitle>
              <MedicalEmployeeReport />
            </SuspensedView>
          }
        />
        <Route
          path='MedicalTypeReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>MedicalTypeReport</PageTitle>
              <MedicalTypeReport />
            </SuspensedView>
          }
        />
        <Route
          path='MedicalSummaryReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>MedicalSummaryReport</PageTitle>
              <MedicalSummaryReport />
            </SuspensedView>
          }
        />
        <Route
          path='report/PayrollLoansDetailsReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>PayrollLoansDetailsReport</PageTitle>
              <PayrollLoansDetailsReport />
            </SuspensedView>
          }
        />
        <Route
          path='report/PayrollSSNITReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>PayrollSSNITReport</PageTitle>
              <PayrollSSNITReport />
            </SuspensedView>
          }
        />
        <Route
          path='report/SavSchemeTransactionInputReport*'
          element={
            <SuspensedView>
              <PageTitle breadcrumbs={accountBreadCrumbs}>
                SavSchemeTransactionInputReport
              </PageTitle>
              <SavSchemeTransactionInputReport />
            </SuspensedView>
          }
        />

        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
