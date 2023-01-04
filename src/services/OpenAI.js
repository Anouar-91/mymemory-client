import axios from "axios";

const translateTextToHtml = (textOpenAi) => {
    return textOpenAi.split('\n').map((str) => `<p>${str}</p>`).join('');
}

export const callApiOpenAI = async (word) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + "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"
    }
    return  await axios.post('https://api.openai.com/v1/completions',
        {
            prompt: `Peux tu me donner une liste de 3 phrases avec le mot anglais ${word} en anglais et leur traduction ?`,
            max_tokens: 2000,
            model: "text-davinci-003",
        },
        { headers })
        .then(response => {
            const responseTextApi = response.data.choices[0].text
            return  translateTextToHtml(responseTextApi)
        })
        .catch((error) => {
            console.log(error)
        })
}
