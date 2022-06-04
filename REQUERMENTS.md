### API Schema:
        
    Users:

        index  --> /users?page=&limit= 

                any of the query will return data put page to paginate limit by defualt = 20 if you want to cjange that provid it.
                                            [get] no content in body
                                                headers [token] for admin
                                            

        show   --> /users/:slug [get] 
                                [headers] token -> user or admin
                                [body] no content        

        create   --> /users/:slug [post] 
                                [headers] noo content
                                [body] {email, password, name[optional], phone, role [user, admin]}

        update   --> /users/:slug [patch] 
                                [headers] token -> user
                                [body] {email[optional], name[optional], phone[optional]}

        login   --> /login      [post] 
                                [headers] noo content
                                [body] {email, password}

        delete   --> /users/:slug [delete] 
                                [headers] token for user
                                [body] no comtent

        aprove  --> /approve_user/:slug [post]
                                        [header] token -> admin
                                        [body] {status [optional-> [active, deactive, suspended]], accepted[optional-> true or false]}
        
        forget_password  --> /forget_password [post]            //pendding need front web page
                                        [header] no content
                                        [body] {email}

        reset_password  --> /reset_password [post]              //pendding need front web page
                                        [header] token -> user
                                        [body] {password}

    Account:
        index-> [get] --> '/users/accounts'
            headers --> token for admin, users
            body --> nothing

        show-> [get] --> '/users/accounts/:slug' 
            headers --> token for admin, users
            body --> nothing

        update-> [patch] --> '/users/accounts/:slug'
            headers --> token for user
            body --> balance-> number

        approve-> [post] --> '/users/accounts/:slug/approve_account'
            headers --> token for admin
            body --> accepted ->boolean
    
    Logs:
        index-> [get] --> '/all_logs'
            headers --> token for admins
            body --> nothing

        show-> [get] --> '/logs' 
            headers --> token for user
            body --> nothing

        create-> [post] --> '/users/:slug/account'
            headers --> token for user
            body --> amount-> number, reciver-> account_number, 
            
            