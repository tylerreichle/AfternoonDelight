import { Actions } from 'react-native-router-flux';
import * as ChatroomUtil from '../util/chatrooms_api';

export const RECEIVE_CHATROOMS = 'RECEIVE_CHATROOMS';
export const RECEIVE_SINGLE_CHATROOM = 'RECEIVE_SINGLE_CHATROOM';
export const REMOVE_CHATROOM = 'REMOVE_CHATROOM';

export const receiveChatrooms = chatrooms => ({
  type: RECEIVE_CHATROOMS,
  chatrooms,
});

export const receiveSingleChatroom = chatroom => ({
  type: RECEIVE_SINGLE_CHATROOM,
  chatroom,
});

export const removeChatroom = chatroom => ({
  type: REMOVE_CHATROOM,
  chatroom,
});

export const fetchChatrooms = () => dispatch => (
  ChatroomUtil.fetchChatrooms().then(
    (resp) => {
      if (resp.ok) {
        resp.json()
          .then((chatrooms) => {
            dispatch(receiveChatrooms(chatrooms));
          });
      } else {
        resp.json()
          .then((err) => {
            console.log(err);
          });
      }
    },
  )
);

export const fetchSingleChatroom = id => dispatch => (
  ChatroomUtil.fetchSingleChatroom(id).then(
    (resp) => {
      if (resp.ok) {
        resp.json()
          .then((chatroom) => {
            dispatch(receiveSingleChatroom(chatroom));
          });
      } else {
        resp.json()
          .then((err) => {
            console.log(err);
          });
      }
    },
  )
);

export const createChatroom = chatroom => dispatch => (
  ChatroomUtil.createChatroom(chatroom).then(
    (resp) => {
      if (resp.ok) {
        resp.json()
          .then((newChatroom) => {
            dispatch(receiveSingleChatroom(newChatroom));
            Actions.ChatroomShow(newChatroom.chatroom.id);
          });
      } else {
        Actions.ChatroomIndex();
      }
    },
  )
);

export const deleteChatroom = chatroomID => dispatch => (
  ChatroomUtil.deleteChatroom(chatroomID)
    .then(resp => resp.json())
    .then(deletedChatroom => dispatch(removeChatroom(deletedChatroom)))
);
