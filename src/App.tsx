import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { StoreProvider } from "./lib/store";
import Layout from "./components/Layout";
import DashLayout from "./components/DashLayout";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import CreatorProfile from "./pages/CreatorProfile";
import Campaigns from "./pages/Campaigns";
import CampaignDetail from "./pages/CampaignDetail";
import Studio from "./pages/Studio";
import Enter from "./pages/Enter";
import BrandOverview from "./pages/brand/BrandOverview";
import BrandCampaigns from "./pages/brand/BrandCampaigns";
import BrandNewCampaign from "./pages/brand/BrandNewCampaign";
import BrandCampaignManage from "./pages/brand/BrandCampaignManage";
import BrandCasting from "./pages/brand/BrandCasting";
import BrandAnalytics from "./pages/brand/BrandAnalytics";
import BrandInbox from "./pages/brand/BrandInbox";
import CreatorOverview from "./pages/creator/CreatorOverview";
import CreatorBookings from "./pages/creator/CreatorBookings";
import CreatorOpportunities from "./pages/creator/CreatorOpportunities";
import CreatorEarnings from "./pages/creator/CreatorEarnings";
import CreatorProfileEdit from "./pages/creator/CreatorProfileEdit";
import CreatorInbox from "./pages/creator/CreatorInbox";

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/enter" element={<Enter />} />

          <Route element={<DashLayout side="brand" />}>
            <Route path="/brand" element={<BrandOverview />} />
            <Route path="/brand/campaigns" element={<BrandCampaigns />} />
            <Route path="/brand/campaigns/new" element={<BrandNewCampaign />} />
            <Route path="/brand/campaigns/:id" element={<BrandCampaignManage />} />
            <Route path="/brand/casting" element={<BrandCasting />} />
            <Route path="/brand/analytics" element={<BrandAnalytics />} />
            <Route path="/brand/inbox" element={<BrandInbox />} />
          </Route>

          <Route element={<DashLayout side="creator" />}>
            <Route path="/creator" element={<CreatorOverview />} />
            <Route path="/creator/bookings" element={<CreatorBookings />} />
            <Route path="/creator/opportunities" element={<CreatorOpportunities />} />
            <Route path="/creator/earnings" element={<CreatorEarnings />} />
            <Route path="/creator/profile" element={<CreatorProfileEdit />} />
            <Route path="/creator/inbox" element={<CreatorInbox />} />
          </Route>

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/creators/:id" element={<CreatorProfile />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/campaigns/:id" element={<CampaignDetail />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/inbox" element={<Navigate to="/enter" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
