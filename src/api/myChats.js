import service from '@/utils/request'

// @Tags MyChats
// @Summary 创建MyChats
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.MyChats true "创建MyChats"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /myChats/createMyChats [post]
export const createMyChats = (data) => {
  return service({
    url: '/myChats/createMyChats',
    method: 'post',
    data
  })
}

// @Tags MyChats
// @Summary 删除MyChats
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.MyChats true "删除MyChats"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /myChats/deleteMyChats [delete]
export const deleteMyChats = (data) => {
  return service({
    url: '/myChats/deleteMyChats',
    method: 'delete',
    data
  })
}

// @Tags MyChats
// @Summary 删除MyChats
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除MyChats"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /myChats/deleteMyChats [delete]
export const deleteMyChatsByIds = (data) => {
  return service({
    url: '/myChats/deleteMyChatsByIds',
    method: 'delete',
    data
  })
}

// @Tags MyChats
// @Summary 更新MyChats
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.MyChats true "更新MyChats"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /myChats/updateMyChats [put]
export const updateMyChats = (data) => {
  return service({
    url: '/myChats/updateMyChats',
    method: 'put',
    data
  })
}

// @Tags MyChats
// @Summary 用id查询MyChats
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.MyChats true "用id查询MyChats"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /myChats/findMyChats [get]
export const findMyChats = (params) => {
  return service({
    url: '/myChats/findMyChats',
    method: 'get',
    params
  })
}

// @Tags MyChats
// @Summary 分页获取MyChats列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取MyChats列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /myChats/getMyChatsList [get]
export const getMyChatsList = (params) => {
  return service({
    url: '/myChats/getMyChatsList',
    method: 'get',
    params
  })
}

export const getKBIds = () => {
  return service({
    url: '/myChats/getKBIds',
    method: 'get',
  })
}
