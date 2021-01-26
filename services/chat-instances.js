let instancesList = [];

exports.addInstance = ({ id, roomId, userId }) => {
  // console.log("add instance", id, roomId, userId); // DEBUG
  const instanceIndex = instancesList.indexOf(
    (instance) => instance.room === roomId && instance.user === userId
  );
  if (instanceIndex === -1) {
    instancesList.push({ id: id, room: roomId, user: userId });
  } else {
    return { error: "User is already connected to this room." };
  }
  return { instance: { id: id, room: roomId, user: userId } };
};

exports.removeInstance = (id, roomId, userId) => {
  const instanceIndex = instancesList.indexOf((instance) => instance.id === id);

  if (instanceIndex !== -1) {
    instancesList.filter((v) => v.id !== id);
  }
};

exports.getInstance = (id) => {
  // console.log("getInstance -> id", id); // DEBUG
  return instancesList.find((instance) => instance.id === id);
};

exports.getUsersInRoom = (roomId) =>
  instancesList.filter((instance) => instance.room === roomId);
