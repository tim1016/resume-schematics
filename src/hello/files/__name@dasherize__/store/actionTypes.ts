export enum ActionTypes {
  CREATE_START = '[<%= classify(name)%>] Start create new <%= classify(name)%>',
  CREATE = '[<%= classify(name)%>] Create new <%= classify(name)%>',
  CREATE_END = '[<%= classify(name)%>] End create new <%= classify(name)%>',
  CREATE_SUCCESS = '[<%= classify(name)%>] Create new success',
  CREATE_FAILURE = '[<%= classify(name)%>] Create new failure',

  READ_START = '[<%= classify(name)%>] Start reading from DB',
  READ_END = '[<%= classify(name)%>] End reading from DB',
  READ_SUCCESS = '[<%= classify(name)%>] Read success',
  READ_FAILURE = '[<%= classify(name)%>] Read failure',

  UPDATE_START = '[<%= classify(name)%>] Start update <%= classify(name)%>',
  UPDATE = '[<%= classify(name)%>] Update <%= classify(name)%>',
  UPDATE_SUCCESS = '[<%= classify(name)%>] Update success',
  UPDATE_FAILURE = '[<%= classify(name)%>] Update failure',

  DELETE_START = '[<%= classify(name)%>] Start Delete <%= classify(name)%>',
  DELETE = '[<%= classify(name)%>] Delete <%= classify(name)%>',
  DELETE_SUCCESS = '[<%= classify(name)%>] Delete success',
  DELETE_FAILURE = '[<%= classify(name)%>] Delete failure',

  CANCEL = '[<%= classify(name)%>] cancel operation',
}
