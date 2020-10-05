
function getMbSize(size){ return `${(size / 1000000.0).toFixed(2)}mb`}
function getKbSize(size){ return `${(size / 1000.0).toFixed(2)}kb`}

export default{ getMbSize, getKbSize}
