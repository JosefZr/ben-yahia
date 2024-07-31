import AccountForm from './account-form'

export default async function Account() {

    const {
        data: { user },
    } = await supabase.auth.getUser()

    return <AccountForm user={user} />
}