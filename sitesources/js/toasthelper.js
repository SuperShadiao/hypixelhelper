window.xsdToast = {
    success: toastSuccess,
    error: toastError,
    info: toastInfo,
};

function toastSuccess(msg) {
    Toastify({
        text: msg,
        duration: 4000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(135deg, #2ecc71, #27ae60)",
            borderLeft: "4px solid #1e8449",
            "max-width": "200px",
            "word-wrap": "break-word",
            "word-break": "break-all",
            "overflow-wrap": "break-word",
        }
    }).showToast();
}

function toastError(msg) {
    Toastify({
        text: msg,
        duration: 5000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(135deg, #e74c3c, #c0392b)",
            borderLeft: "4px solid #922b21",
            "max-width": "200px",
            "word-wrap": "break-word",
            "word-break": "break-all",
            "overflow-wrap": "break-word",
        }
    }).showToast();
}

function toastInfo(msg) {
    Toastify({
        text: msg,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(135deg, #3498db, #2980b9)",
            borderLeft: "4px solid #1a5276",
            "max-width": "200px",
            "word-wrap": "break-word",
            "word-break": "break-all",
            "overflow-wrap": "break-word",
        }
    }).showToast();
}