Users:
    email: varchar not null, uniqe
    password: varchar not null, min(8)
    name: varchar defualt email.split('@'), opthonal
    phone: varchar not null
    status: varchar [active, deactive, suspended]
    accepted: boolean, defualt false
    role: varchar [admin, user]
    slug: varchar not null, uniqe email.split('@')

account:
    user_slug: forign key
    accepted: boolean, defualt false
    balance: int defualt 0, not -
    account_number: int, uniqe, not null

transfare_operations:
    account_number: int forign key(account_number), not null
    from_or_to: varchar [from, to]
    to_who: int forign key(account_number), not null
    created_at: date time defualt now
    balance_before: int
    balcance_after: int

-----------------------------------------------

Pages:
    login (users, admins)
    register (users)
    user detail (user)
    accounts list (users)
    logs list (can be fillter by account) (user, admins)
    log detail (user, admins)
    transaction (users)

    admin logs list for a account
    admin log detail for account
    admin users list 
    admin user detail

Authrization
    admin: 
        can active, deactive and suspend user
        acceppt or reject user register
        acceppt or reject user account
        can login

    user:
        can init account
        can login
        can register
        can make a transfare

        if status = deactive
        can't tranfare

        if status = suspended
        can't login