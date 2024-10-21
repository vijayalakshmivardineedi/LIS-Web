// src/App.js
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Panels/SuperAdmin/Authentication/Login";
import ForgotPasswordScreen from "./Panels/SuperAdmin/Authentication/ForgotPassword";
import ResetPasswordScreen from "./Panels/SuperAdmin/Authentication/ResetPasswordScreen";
import OtpVerification from "./Panels/SuperAdmin/Authentication/OtpVerification";
import Signup from "./Panels/SuperAdmin/Authentication/SignUp";
import Header from "./Panels/SuperAdmin/components/Header";
import Dashboard from "./Panels/SuperAdmin/Navigations/Dashboard";
import SocietyCreation from "./Panels/SuperAdmin/Navigations/SocietyCreation";
import Cities from "./Panels/SuperAdmin/Navigations/Cities";
import Payments from "./Panels/SuperAdmin/Navigations/Payment";
import Renewal from "./Panels/SuperAdmin/Navigations/Renewal";
import Societies from "./Panels/SuperAdmin/Navigations/Pannels/Societies";
import AddPlans from "./Panels/SuperAdmin/Navigations/Plans/AddPlans";
import EditPlan from "./Panels/SuperAdmin/Navigations/Plans/EditPlan";
import AddFeature from "./Panels/SuperAdmin/Navigations/Plans/AddFeature";
import EditFeature from "./Panels/SuperAdmin/Navigations/Plans/EditFeature";
import SocietyDetails from "./Panels/SuperAdmin/Navigations/SocietyDetails";
import RenewForm from "./Panels/SuperAdmin/Navigations/RenewForm";
import DemoRequest from "./Panels/SuperAdmin/Navigations/DemoRequest";
import ProtectedRoute from "./ProtectedRoute";
import OurPlans from "./Panels/SuperAdmin/Navigations/OurPlans";
import Home from "./Panels/Website/Page/Home";
/*SocietyAdmin*/
import Sidebar from "./Panels/SocietyAdmin/Components/Sidebar";
import SocietyDashboard from "./Panels/SocietyAdmin/Pages/Dashboard/Dashboard";
import User from "./Panels/SocietyAdmin/Pages/UserManagement/List";
import View from './Panels/SocietyAdmin/Pages/UserManagement/View';
import StaffMember from './Panels/SocietyAdmin/Pages/StaffMember/List';
import AddStaff from './Panels/SocietyAdmin/Pages/StaffMember/Add';
import EditStaff from './Panels/SocietyAdmin/Pages/StaffMember/Edit';
import ListPage from './Panels/SocietyAdmin/Pages/StaffMember/ListPage';
import GateKeeper from './Panels/SocietyAdmin/Pages/GateKeeper/List';
import AddGateKeeper from './Panels/SocietyAdmin/Pages/GateKeeper/Add';
import ViewGateKeeper from './Panels/SocietyAdmin/Pages/GateKeeper/View';
import EditGateKeeper from './Panels/SocietyAdmin/Pages/GateKeeper/Edit';
import AddAttendanceGateKeeper from './Panels/SocietyAdmin/Pages/GateKeeper/Attendance';
import Committee from './Panels/SocietyAdmin/Pages/Committee/List';
import AddCommittee from './Panels/SocietyAdmin/Pages/Committee/Add';
import EditCommittee from './Panels/SocietyAdmin/Pages/Committee/Edit';
import Documents from './Panels/SocietyAdmin/Pages/Documents/List';
import StaffRecord from './Panels/SocietyAdmin/Pages/StaffRecord/List';
import VisitorRecord from './Panels/SocietyAdmin/Pages/VisitorRecord/List';
import ViewVisitor from './Panels/SocietyAdmin/Pages/VisitorRecord/View';
import AddsList from './Panels/SocietyAdmin/Pages/Advertisements/List';
import AddAdvertisements from './Panels/SocietyAdmin/Pages/Advertisements/Add';
import EditAdvertisements from './Panels/SocietyAdmin/Pages/Advertisements/Edit';
import ViewAdvertisements from './Panels/SocietyAdmin/Pages/Advertisements/View';
import SocietyBills from './Panels/SocietyAdmin/Pages/SocietyBills/List';
import EditSocietyBills from './Panels/SocietyAdmin/Pages/SocietyBills/Edit';
import AddSocietyBills from './Panels/SocietyAdmin/Pages/SocietyBills/Add';
import Profile from './Panels/SocietyAdmin/Pages/Profile/Profile';
import Residents from './Panels/SocietyAdmin/Pages/Residents/List';
import Notice from './Panels/SocietyAdmin/Pages/Notice/List';
import Addnotice from './Panels/SocietyAdmin/Pages/Notice/Add';
import EditNotice from './Panels/SocietyAdmin/Pages/Notice/Edit';
import Event from './Panels/SocietyAdmin/Pages/Event/List';
import AddEvent from './Panels/SocietyAdmin/Pages/Event/Add';
import EditEvent from './Panels/SocietyAdmin/Pages/Event/Edit';
import ViewEvent from './Panels/SocietyAdmin/Pages/Event/View';
import AssetsList from './Panels/SocietyAdmin/Pages/AssetsandInventory/AssetsList';
import AddAssets from './Panels/SocietyAdmin/Pages/AssetsandInventory/AddAssets';
import EditAssets from './Panels/SocietyAdmin/Pages/AssetsandInventory/EditAssets';
import InventoryList from './Panels/SocietyAdmin/Pages/AssetsandInventory/InventoryList';
import AddInventory from './Panels/SocietyAdmin/Pages/AssetsandInventory/AddInventory';
import EditInventory from './Panels/SocietyAdmin/Pages/AssetsandInventory/EditInventory';
import Amenities from './Panels/SocietyAdmin/Pages/Amenities/List';
import AddAminity from './Panels/SocietyAdmin/Pages/Amenities/AddAmenities';
import EditAminity from './Panels/SocietyAdmin/Pages/Amenities/Edit';
import ViewAminity from './Panels/SocietyAdmin/Pages/Amenities/View';
import Complaint from './Panels/SocietyAdmin/Pages/Complaint/List';
import BookingList from './Panels/SocietyAdmin/Pages/BookingAmenities/List';
import AddBooking from './Panels/SocietyAdmin/Pages/BookingAmenities/Add';
import EditBooking from './Panels/SocietyAdmin/Pages/BookingAmenities/Edit';
import DiscussionTabs from './Panels/SocietyAdmin/Pages/Discussions/DiscussionTabs';
import Settings from './Panels/SocietyAdmin/Pages/Settings/Settings';
import Maintainance from './Panels/SocietyAdmin/Pages/SocietyMaintainance/List';
import AddMontlyMaintainance from './Panels/SocietyAdmin/Pages/SocietyMaintainance/Add';
import PayMaintainance from './Panels/SocietyAdmin/Pages/SocietyMaintainance/Edit';
import StatusMaintainance from './Panels/SocietyAdmin/Pages/SocietyMaintainance/Conformation';

import SocietyProtectedRoute from "./SocietyProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ForgotPassword" element={<ForgotPasswordScreen />} />
        <Route path="/OtpVerification/:email" element={<OtpVerification />} />
        <Route
          path="/ResetPasswordScreen/:email"
          element={<ResetPasswordScreen />}
        />
        <Route path="/SuperAdminpanel/Signup" element={<Signup />} />
        <Route
          path="/superadmin/*"
          element={
            <ProtectedRoute>
              <Header />
              <Routes>
                <Route exact path="dashboard" element={<Dashboard />} />
                <Route path="cities" element={<Cities />} />
                <Route path="societies/:cityId" element={<Societies />} />
                <Route path="societyCreation" element={<SocietyCreation />} />
                <Route path="payments" element={<Payments />} />
                <Route path="renewal" element={<Renewal />} />
                <Route path="renewal/:societyId" element={<RenewForm />} />
                <Route path="plans" element={<OurPlans />} />
                <Route path="addPlans" element={<AddPlans />} />
                <Route path="editPlans/:id" element={<EditPlan />} />
                <Route path="addFeatures" element={<AddFeature />} />
                <Route path="editFeatures/:id" element={<EditFeature />} />
                <Route path="societyDetails/:cityId/:id" element={<SocietyDetails />} />
                <Route path="demoRequests" element={<DemoRequest />} />
              </Routes>
            </ProtectedRoute>
          }
        />
        <Route
          path="/societyAdmin/*"
          element={
            <SocietyProtectedRoute>
              <Sidebar>
                <Routes>
                  <Route path='dashboard' element={<SocietyDashboard />} />
                  <Route path='userManagement' element={<User />} />
                  <Route path='view/:userId' element={<View />} />
                  <Route path='staffMember' element={<StaffMember />} />
                  <Route path='addstaffMember' element={<AddStaff />} />
                  <Route path='editstaffMember/:serviceType/:userid' element={<EditStaff />} />
                  <Route path='staffMember/ListPage/:serviceType' element={<ListPage />} />
                  <Route path='gatekeeper/list' element={<GateKeeper />} />
                  <Route path='gatekeeper/add' element={<AddGateKeeper />} />
                  <Route path='gatekeeper/view/:sequrityId' element={<ViewGateKeeper />} />
                  <Route path='gatekeeper/edit/:sequrityId' element={<EditGateKeeper />} />
                  <Route path='gatekeeper/attandance/:sequrityId' element={<AddAttendanceGateKeeper />} />
                  <Route path='userManagement/committee' element={<Committee />} />
                  <Route path='committee/Add' element={< AddCommittee />} />
                  <Route path='committee/Edit/:id' element={<EditCommittee />} />
                  <Route path='documents' element={<Documents />} />
                  <Route path='staffRecord' element={<StaffRecord />} />
                  <Route path='visitorRecord' element={<VisitorRecord />} />
                  <Route path='view/visitorRecord/:visitorId' element={<ViewVisitor />} />
                  <Route path='addsList' element={<AddsList />} />
                  <Route path='add/Adds' element={<AddAdvertisements />} />
                  <Route path='edit/Adds/:id' element={<EditAdvertisements />} />
                  <Route path='view/Adds/:id' element={<ViewAdvertisements />} />
                  <Route path='societyBills' element={<SocietyBills />} />
                  <Route path='edit/societyBills/:id' element={<EditSocietyBills />} />
                  <Route path='add/societyBills' element={<AddSocietyBills />} />
                  <Route path='amenities' element={<Amenities />} />
                  <Route path='addAminity' element={<AddAminity />} />
                  <Route path='editAminity/:id' element={<EditAminity />} />
                  <Route path='viewAminity/:id' element={<ViewAminity />} />
                  <Route path='bookings' element={<BookingList />} />
                  <Route path='addBookings/:id' element={<AddBooking />} />
                  <Route path='editBookings/:id/:userId' element={<EditBooking />} />
                  {/* <Route path='payment' element={<Payment />} /> */}
                  {/* <Route path='addPayments' element={<AddPayments />} /> */}
                  {/* <Route path='editPayments/:id' element={<EditPayments />} /> */}
                  <Route path='residents' element={<Residents />} />
                  <Route path='notice' element={<Notice />} />
                  <Route path='addnotice' element={<Addnotice />} />
                  <Route path='editNotice/:_id' element={<EditNotice />} />
                  <Route path='profile' element={<Profile />} />
                  <Route path='complaints' element={<Complaint />} />
                  <Route path='event' element={<Event />} />
                  <Route path='AddEvent' element={<AddEvent />} />
                  <Route path='editEvent/:id' element={<EditEvent />} />
                  <Route path='viewEvent/:id' element={<ViewEvent />} />
                  <Route path='assets' element={<AssetsList />} />
                  <Route path='addAssets' element={<AddAssets />} />
                  <Route path='editAssets/:id' element={<EditAssets />} />
                  <Route path='inventory' element={<InventoryList />} />
                  <Route path='addInventory' element={<AddInventory />} />
                  <Route path='inventory/edit/:id' element={<EditInventory />} />
                  <Route path='discussions' element={<DiscussionTabs />} />
                  <Route path='settings' element={<Settings />} />
                  {/* <Route path='report' element={<Reporttabs />} /> */}
                  <Route path='maintainance' element={<Maintainance />} />
                  <Route path='addMontlyMaintainance' element={<AddMontlyMaintainance />} />
                  <Route path='payMaintainance/:blockno/:flatno/:monthAndYear' element={<PayMaintainance />} />
                  <Route path='status/:blockno/:flatno/:monthAndYear' element={<StatusMaintainance />} />
                </Routes>
              </Sidebar>
            </SocietyProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
