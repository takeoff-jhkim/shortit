export default function handler(request, response) {
    switch (request.method) {
        case "POST":
            response.status(201).send(request.body);
            break;
        case "GET":
            response.send([
                {
                    "id": "abc",
                    "title": "위키피디아 Next.js",
                    "url": "https://en.wikipedia.org/wiki/Next.js"
                },
                {
                    "id": "def",
                    "title": "코드잇 자유게시판",
                    "url": "https://codeit.kr/community/general"
                },
                {
                    "id": "ghi",
                    "title": "코드잇 질문답변",
                    "url": "https://www.codeit.kr/community/questions"
                }
            ])
            break;
        default:
            response.status(404).send();
    }
}