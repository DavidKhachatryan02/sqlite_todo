import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { ApiClient } from "../api/config";

const SnackbarInitializer = () => {
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        ApiClient.initializeSnackbar(enqueueSnackbar);
    }, [enqueueSnackbar]);

    return null;
};

export default SnackbarInitializer;