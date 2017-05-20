package actions

import "colsys-backend/pkg/domain"

var (
	funcs = NewFuncs(100)
)

func init() {
	funcs.Bind("sendEmail", SendEmail)
	funcs.Bind("pushNotif", PushNotif)
}

func Invoke(action *domain.Action, invokedRule *domain.InvokedRule) {
	// TODO : Pass user param to action to invoke action to specific user
	funcs.Call(action.CallbackFn, invokedRule)
}
