import service from '@/utils/request'

// @Tags UserKnowledgeBase
// @Summary 创建UserKnowledgeBase
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.UserKnowledgeBase true "创建UserKnowledgeBase"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /userKnowledgeBase/createUserKnowledgeBase [post]
export const createUserKnowledgeBase = (data) => {
  return service({
    url: '/userKnowledgeBase/createUserKnowledgeBase',
    method: 'post',
    data
  })
}

// @Tags UserKnowledgeBase
// @Summary 删除UserKnowledgeBase
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.UserKnowledgeBase true "删除UserKnowledgeBase"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /userKnowledgeBase/deleteUserKnowledgeBase [delete]
export const deleteUserKnowledgeBase = (data) => {
  return service({
    url: '/userKnowledgeBase/deleteUserKnowledgeBase',
    method: 'delete',
    data
  })
}

// @Tags UserKnowledgeBase
// @Summary 删除UserKnowledgeBase
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除UserKnowledgeBase"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /userKnowledgeBase/deleteUserKnowledgeBase [delete]
export const deleteUserKnowledgeBaseByIds = (data) => {
  return service({
    url: '/userKnowledgeBase/deleteUserKnowledgeBaseByIds',
    method: 'delete',
    data
  })
}

// @Tags UserKnowledgeBase
// @Summary 更新UserKnowledgeBase
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.UserKnowledgeBase true "更新UserKnowledgeBase"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /userKnowledgeBase/updateUserKnowledgeBase [put]
export const updateUserKnowledgeBase = (data) => {
  return service({
    url: '/userKnowledgeBase/updateUserKnowledgeBase',
    method: 'put',
    data
  })
}

// @Tags UserKnowledgeBase
// @Summary 用id查询UserKnowledgeBase
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.UserKnowledgeBase true "用id查询UserKnowledgeBase"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /userKnowledgeBase/findUserKnowledgeBase [get]
export const findUserKnowledgeBase = (params) => {
  return service({
    url: '/userKnowledgeBase/findUserKnowledgeBase',
    method: 'get',
    params
  })
}

// @Tags UserKnowledgeBase
// @Summary 分页获取UserKnowledgeBase列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取UserKnowledgeBase列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /userKnowledgeBase/getUserKnowledgeBaseList [get]
export const getUserKnowledgeBaseList = (params) => {
  return service({
    url: '/userKnowledgeBase/getUserKnowledgeBaseList',
    method: 'get',
    params
  })
}
