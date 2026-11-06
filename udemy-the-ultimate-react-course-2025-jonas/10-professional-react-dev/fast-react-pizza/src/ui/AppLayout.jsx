import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loading from "./Loading";

function AppLayout() {
    const navigation = useNavigation();
    const isLoading = (navigation.state === 'loading');

    return (
        <div className="grid h-screen grid-rows-[auto_1fr_auto]">
            {isLoading && <Loading />}
            
            <Header />
            <main className="overflow-scroll">
                <div className="max-w-3xl mx-auto">
                    <Outlet />
                </div>
            </main>
            <CartOverview />
        </div>
    );
}

export default AppLayout;