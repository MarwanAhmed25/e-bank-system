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
                                [body] {email, password, name[optional], phone}

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
                                        [body] {status [optional], accepted[optional]}