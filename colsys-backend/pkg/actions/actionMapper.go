package actions

import "colsys-backend/pkg/domain"

var (
	actionMap = map[string]interface{}{
		"sendEmail": SendEmail,
		"pushNotif": PushNotif,
	}
	funcs = NewFuncs(100)
)

func Invoke(action *domain.Action, invokedRule *domain.InvokedRule) {
	// TODO : Pass user param to action to invoke action to specific user
	funcs.Bind(action.CallbackFn, actionMap[action.CallbackFn])
	funcs.Call(action.CallbackFn, invokedRule)
}
