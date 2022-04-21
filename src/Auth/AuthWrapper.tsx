interface AuthWrapperProps {
    children: React.ReactNode
}
const AuthWrapper = (props: AuthWrapperProps) => {
	return <>{props.children}</>
}

export default AuthWrapper
