// src/app/store.js

import { configureStore } from "@reduxjs/toolkit";
import superAdminReducer from "./Slice/SuperAdmin/SignUpSlice";
import authReducer from "./Slice/SuperAdmin/LoginSlice";
import emailVerificationReducer from "./Slice/SuperAdmin/emailVerificationSlice";
import otpReducer from "./Slice/SuperAdmin/OtpSlice";
import passwordResetReducer from "./Slice/SuperAdmin/passwordResetSlice";
import SuperadminPaymentsReducer from './Slice/SuperAdmin/PaymentSlice';
import { cityReducer } from "./Slice/SuperAdmin/citiesSlice";
import societiesReducer from './Slice/SuperAdmin/societiesSlice';
import societyReducer from './Slice/SuperAdmin/societySlice';
import allSocietiesReducer from './Slice/SuperAdmin/AllsocietiesSlice';
import allUserReducer from './Slice/SuperAdmin/userSlice';
import getPlansReducer from './Slice/SuperAdmin/getPlansSlice';
import featuresReducer from './Slice/SuperAdmin/FeaturesSlice';
import addPlanReducer from './Slice/SuperAdmin/PlansSlice';
import societyByIdReducer from './Slice/SuperAdmin/societydetailsSlice';
import amenitieslistReducer from './Slice/SuperAdmin/amenitiesSlice';
import userProfileReducer from './Slice/SuperAdmin/userProfilesSlice';
import visitorReducer from './Slice/SuperAdmin/visitorsSlice';
import NotificationReducer from './Slice/SuperAdmin/notificationSlice';
import demoReducer from './Slice/SuperAdmin/DemoSlice';
import loginReducer from './Slice/Website/LoginSlice';




import { listReducer } from '../Panels/SocietyAdmin/Pages/UserManagement/ListSlice';
import { staffReducer } from '../Panels/SocietyAdmin/Pages/StaffMember/StaffSlice';
import { GateKeeperReducer } from '../Panels/SocietyAdmin//Pages/GateKeeper/GateKeeperSlice';
import { CommityMembersReducer } from '../Panels/SocietyAdmin//Pages/Committee/committeeSlice';
import { DocumentsReducer } from '../Panels/SocietyAdmin/Pages/Documents/DocumentsSlice';
import { ComplaintReducer } from '../Panels/SocietyAdmin/Pages/Complaint/ComplaintSlice';
import { profileReducer } from '../Panels/SocietyAdmin/Pages/Profile/profileSlice';
import { visitorsReducer } from '../Panels/SocietyAdmin/Pages/VisitorRecord/ListSlice';
import { staffRecordReducer } from '../Panels/SocietyAdmin/Pages/StaffRecord/ListSlice';
import { EventReducer } from '../Panels/SocietyAdmin/Pages/Event/EventSlice';
import { AdvertisementReducer } from '../Panels/SocietyAdmin/Pages/Advertisements/AdvertisementSlice';
import { noticeReducer } from '../Panels/SocietyAdmin/Pages/Notice/NoticeSlice';
import { inventoryReducer } from '../Panels/SocietyAdmin/Pages/AssetsandInventory/InventorySlice';
import { AssetlistReducer } from '../Panels/SocietyAdmin/Pages/AssetsandInventory/AssetsListSlice';
import { societyBillsReducer } from '../Panels/SocietyAdmin/Pages/SocietyBills/SocietyBillsSlice';
import { amenitiesReducer } from '../Panels/SocietyAdmin/Pages/Amenities/AmenitiesSlice';
import { bookingReducer } from '../Panels/SocietyAdmin/Pages/BookingAmenities/BookingSlice';
// import { PaymentsReducer } from '../Panels/SocietyAdmin/Pages/Payments/PaymentsSlice';
import resetPasswordReducer from '../Panels/SocietyAdmin/Pages/Settings/SettingsSlice';
import { MaintainanceReducer } from "../Panels/SocietyAdmin/Pages/SocietyMaintainance/SocietyMaintainanceSlice";
import { RenewalPlanReducer } from "./Slice/SuperAdmin/renewalSlice";
export const store = configureStore({
  reducer: {
    superAdmin: superAdminReducer,
    auth: authReducer,
    emailVerification: emailVerificationReducer,
    otp: otpReducer,
    passwordReset: passwordResetReducer,
    Payments: SuperadminPaymentsReducer,
    cities: cityReducer,
    societies: societiesReducer,
    society: societyReducer,
    allsocieties: allSocietiesReducer,
    user: allUserReducer,
    plan: getPlansReducer,
    features: featuresReducer,
    addPlan: addPlanReducer,
    societyById: societyByIdReducer,
    amenities: amenitieslistReducer,
    UserProfile: userProfileReducer,
    visitors: visitorReducer,
    notification: NotificationReducer,
    demo: demoReducer,
    renewal: RenewalPlanReducer,
    ///Website
    loginWeb: loginReducer,

    //SocietyAdmin
    userlist: listReducer,
    staff: staffReducer,
    gateKeepers: GateKeeperReducer,
    commityMembers: CommityMembersReducer,
    documents: DocumentsReducer,
    staffRecord: staffRecordReducer,
    advertisements: AdvertisementReducer,
    societyBills: societyBillsReducer,
    amenitieslist: amenitiesReducer,
    bookings: bookingReducer,
    // payments: PaymentsReducer,
    profile: profileReducer,
    events: EventReducer,
    notice: noticeReducer,
    complaintList: ComplaintReducer,
    visitorsRecords: visitorsReducer,
    inventory: inventoryReducer,
    Assetlist: AssetlistReducer,
    resetPassword: resetPasswordReducer,
    maintainance: MaintainanceReducer
  },
});
export default store;
