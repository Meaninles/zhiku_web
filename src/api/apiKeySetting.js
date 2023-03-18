import service from '@/utils/request'

// @Tags ApiKeySetting
// @Summary 创建ApiKeySetting
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ApiKeySetting true "创建ApiKeySetting"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /apiKeySetting/createApiKeySetting [post]
export const createApiKeySetting = (data) => {
  return service({
    url: '/apiKeySetting/createApiKeySetting',
    method: 'post',
    data
  })
}

// @Tags ApiKeySetting
// @Summary 删除ApiKeySetting
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ApiKeySetting true "删除ApiKeySetting"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /apiKeySetting/deleteApiKeySetting [delete]
export const deleteApiKeySetting = (data) => {
  return service({
    url: '/apiKeySetting/deleteApiKeySetting',
    method: 'delete',
    data
  })
}

// @Tags ApiKeySetting
// @Summary 删除ApiKeySetting
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除ApiKeySetting"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /apiKeySetting/deleteApiKeySetting [delete]
export const deleteApiKeySettingByIds = (data) => {
  return service({
    url: '/apiKeySetting/deleteApiKeySettingByIds',
    method: 'delete',
    data
  })
}

// @Tags ApiKeySetting
// @Summary 更新ApiKeySetting
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ApiKeySetting true "更新ApiKeySetting"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /apiKeySetting/updateApiKeySetting [put]
export const updateApiKeySetting = (data) => {
  return service({
    url: '/apiKeySetting/updateApiKeySetting',
    method: 'put',
    data
  })
}

// @Tags ApiKeySetting
// @Summary 用id查询ApiKeySetting
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.ApiKeySetting true "用id查询ApiKeySetting"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /apiKeySetting/findApiKeySetting [get]
export const findApiKeySetting = (params) => {
  return service({
    url: '/apiKeySetting/findApiKeySetting',
    method: 'get',
    params
  })
}

// @Tags ApiKeySetting
// @Summary 分页获取ApiKeySetting列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取ApiKeySetting列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /apiKeySetting/getApiKeySettingList [get]
export const getApiKeySettingList = (params) => {
  return service({
    url: '/apiKeySetting/getApiKeySettingList',
    method: 'get',
    params
  })
}

export const useApiKeySetting = (data) => {
  return service({
    url: '/apiKeySetting/useApiKeySetting',
    method: 'post',
    data
  })
}
