import React from "react";
import { MintButton } from "./mint"
import store from "./redux/store";
import { Provider } from "react-redux";

export function MintNFT(props) {
    return (
        <Provider store={store}>
            <MintButton />
        </Provider>
    );
}