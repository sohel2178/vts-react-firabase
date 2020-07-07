function dex_to_degrees(dex) {
  return parseInt(dex, 16) / 1800000;
}

export const convertData = data => {
  // console.log(data)
  let lat = dex_to_degrees(data.lat);
  let lng = dex_to_degrees(data.lng);
  let speed = dex_to_degrees(data.speed) * 1800000;
  let acc = data.acc;
  let newData = {
    lat: lat,
    lng: lng,
    speed: speed,
    acc: acc
  };

  return newData;
};

export const checkUserActiveDevice = devices => {
  let assignedDevices = [];
  devices.map(device => {
    if (device.uid !== null) {
      assignedDevices.push(device);
    }
  });
  return assignedDevices;
};

export const checkUserInactiveDevice = devices => {
  let inactiveDevices = [];
  devices.map(device => {
    if (device.uid === null) {
      inactiveDevices.push(device);
    }
  });
  return inactiveDevices;
};

export const calculatePercentage = (all, items) => {
  return ((items * 100) / all).toFixed(2);
};

export const findUserDeviceForDetails = (allDevices, deviceId) => {
  let deviceDetails = {};
  deviceDetails = allDevices.find(device => device._id === deviceId);
  return deviceDetails;
};

export const findActiveUsers = allUsers => {
  let activeUsers = [];
  allUsers.map(user => {
    if (!user.is_admin) {
      activeUsers.push(user);
    }
  });
  return activeUsers;
};

export const findAdminUsers = allUsers => {
  let adminUsers = [];
  allUsers.map(user => {
    if (user.is_admin) {
      adminUsers.push(user);
    }
  });
  return adminUsers;
};
