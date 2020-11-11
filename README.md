This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

  

## Getting Started

  

First, run the development server:

  

```bash

npm run dev

# or

yarn dev

```

  

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

  


  

## TODO

### Firebase Firestore Database structure

```yml
{
    "recipes": {
        "_id": {
            "name": "recipe's name",
            "description": "recipe's description",
            "steps": {
                "_id": "step's content"
            },
            "ingredients": {
                "_id": {
                    "name": "ingredient's name",
                    "quantity": "X gram / something"
                }
            },
            "video": {
                "title": "video's title",
                "url": "video's url"
            },
            "image": {
                "alt": "image's alt",
                "src": "image's source"
            },
            "catagories": {
                "_id": {
                    "name": "category"
                }
            }
        }
    }
}
```
