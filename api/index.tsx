import { Button, Frog, TextInput } from 'frog'
import { handle } from 'frog/vercel'
import { neynar } from 'frog/middlewares'
import { Box, Image, Text, vars } from "../lib/ui.js";

// Uncomment this packages to tested on local server
// import { devtools } from 'frog/dev';
// import { serveStatic } from 'frog/serve-static';

const baseUrl = "https://warpcast.com/~/compose";
const text = "Get $1000 (not real money, just for fun) by finishing the @propy quest game 🕹️\nFrame by @0x94t3z.eth";
const embedUrl = "https://propy-quest-game.vercel.app/api/frame";

const BROWSER_LOCATION = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrl)}`;

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api/frame',
  imageAspectRatio: '1.91:1',
  ui: { vars },
  browserLocation: BROWSER_LOCATION
}).use(
  neynar({
    apiKey: process.env.NEYNAR_API_KEY || 'NEYNAR_API_DOCS',
    features: ['interactor', 'cast'],
  }),
)

const NEXT_PUBLIC_BASE_URL = 'https://propy-quest-game.vercel.app' ||  'http://localhost:5173';

const image = `${NEXT_PUBLIC_BASE_URL}/propy.png`;

// Array of AI Landmark NFTs
const first_landmark = 
  { 
    id: '2', 
    url: 'https://propy.mypinata.cloud/ipfs/QmPohGugJXQSC1w4Bw4wTnjWkTyF67QVkjvie4WbgN2iuM', 
    clue: 'https://dapp.propy.com/#/token/base/0xa239b9b3E00637F29f6c7C416ac95127290b950E/214088', 
    answer: 'Art Institute of Chicago',
    correct_answer: 'https://media.giphy.com/media/MMYXivWxc92s4RDdI9/giphy.gif',
    wrong_answer: 'https://media.giphy.com/media/jyEM1C2euOklQ18qrq/giphy.gif'
  };

const second_landmark = 
  { 
    id: '1', 
    url: 'https://propy.mypinata.cloud/ipfs/QmaoxAmrc8MTZdkKiob7zSVfvoJPWb1gT7K2d3jZNrJqB8', 
    clue: 'https://dapp.propy.com/#/token/base/0xa239b9b3E00637F29f6c7C416ac95127290b950E/214103', 
    answer: 'Red Pyramid',
    correct_answer: 'https://media.giphy.com/media/9umOff5LV72MZV5iQg/giphy.gif',
    wrong_answer: 'https://media.giphy.com/media/cnlrYuoaoHbQBdqMem/giphy.gif'
  };

const third_landmark = 
  { 
    id: '3', 
    url: 'https://propy.mypinata.cloud/ipfs/QmZ5jJJj5jqNWVom39BnkjEKHbRZWh11Mzwzgqat4ruEDB',
    clue: 'https://dapp.propy.com/#/token/base/0xa239b9b3E00637F29f6c7C416ac95127290b950E/214083', 
    answer: 'Cannes',
    correct_answer: 'https://media.giphy.com/media/FvepNpsaMtmHy0tBN8/giphy.gif',
    wrong_answer: 'https://media.giphy.com/media/CvQoLd8ERRZstaxbhe/giphy.gif'
  };

const fourth_landmark = 
  { 
    id: '4', 
    url: 'https://propy.mypinata.cloud/ipfs/QmedsJa3wG1Nj4aEkEc6SqBKU9o1zh1cmUsGfiYu5TZS3A',
    clue: 'https://dapp.propy.com/#/token/base/0xa239b9b3E00637F29f6c7C416ac95127290b950E/214074', 
    answer: 'Brixton Market',
    correct_answer: 'https://media.giphy.com/media/YCk2ktAMKocpxe7j8G/giphy.gif',
    wrong_answer: 'https://media.giphy.com/media/kBVyxpXLJ94B6G4qHK/giphy.gif'
  };

const fifth_landmark = 
  { 
    id: '5', 
    url: 'https://propy.mypinata.cloud/ipfs/QmaAMuqBGdvDnwB8FBANoLcYpJhk7YJ3B9dV484imat2LP',
    clue: 'https://dapp.propy.com/#/token/base/0xa239b9b3E00637F29f6c7C416ac95127290b950E/214072', 
    answer: 'Nintendo',
    correct_answer: 'https://media.giphy.com/media/26tknCqiJrBQG6bxC/giphy.gif',
    wrong_answer: 'https://media.giphy.com/media/hPPx8yk3Bmqys/giphy.gif'
  };

app.frame('/', (c) => {
  return c.res({
    title: 'Propy Quest Game',
    image: (
      <Box
        alignHorizontal="center" 
        alignVertical="center"
        backgroundImage={`url(${image})`}
        justifyContent="center"
        height="100%"
        width="100%"
        backgroundSize="100% 100%"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
      >
        <Box
          paddingBottom="80"
          alignHorizontal="center" 
          alignVertical="center"
          position="absolute"
        >
          <Text color="white" size="64">
            PROPY
          </Text>
        </Box>
        <Box
          paddingTop="36"
          alignHorizontal="center" 
          alignVertical="center"
          position="absolute"
        >
          <Text color="white" size="64">
            QUEST
          </Text>
        </Box>
        <Box
          paddingTop="128"
          alignHorizontal="center" 
          alignVertical="center"
          position="absolute"
        >
          <Text color="white" size="24">
            GAME
          </Text>
        </Box>
      </Box>
    ),
    intents: [
      <Button action="/1">START</Button>,
    ],
  })
});


app.frame('/1', async (c) => {
  return c.res({
    title: 'Propy Quest Game',
    imageAspectRatio: '1:1',
    image: first_landmark.url,
    intents: [
      <TextInput placeholder="Q: Name of this Landmark?" />,
      <Button action='/first-check'>Submit</Button>,
      <Button.Link href={first_landmark.clue}>Clue</Button.Link>
    ],
  });
});

app.frame('/first-check', async (c) => {
  const inputText = c.inputText ?? '';

  if (inputText.trim().toLowerCase() === first_landmark.answer.toLowerCase()) {
    return c.res({
      title: 'Propy Quest Game',
      imageAspectRatio: '1:1',
      image: first_landmark.correct_answer,
      intents: [
        <Button action='/2'>Continue</Button>,
      ],
    });
  }

  return c.res({
    title: 'Propy Quest Game',
    imageAspectRatio: '1:1',
    image: first_landmark.wrong_answer,
    intents: [
      <Button action='/1'>Try again</Button>,
      <Button.Link href={first_landmark.clue}>Clue</Button.Link>
    ],
  });
});


app.frame('/2', async (c) => {
  return c.res({
    title: 'Propy Quest Game',
    imageAspectRatio: '1:1',
    image: second_landmark.url,
    intents: [
      <TextInput placeholder="Q: Name of this Landmark?" />,
      <Button action='/second-check'>Submit</Button>,
      <Button.Link href={second_landmark.clue}>Clue</Button.Link>
    ],
  });
});

app.frame('/second-check', async (c) => {
  const inputText = c.inputText ?? '';

  if (inputText.trim().toLowerCase() === second_landmark.answer.toLowerCase()) {
    return c.res({
      title: 'Propy Quest Game',
      imageAspectRatio: '1:1',
      image: second_landmark.correct_answer,
      intents: [
        <Button action='/3'>Continue</Button>,
      ],
    });
  }

  return c.res({
    title: 'Propy Quest Game',
    imageAspectRatio: '1:1',
    image: second_landmark.wrong_answer,
    intents: [
      <Button action='/2'>Try again</Button>,
      <Button.Link href={second_landmark.clue}>Clue</Button.Link>
    ],
  });
});


app.frame('/3', async (c) => {
  return c.res({
    title: 'Propy Quest Game',
    imageAspectRatio: '1:1',
    image: second_landmark.url,
    intents: [
      <TextInput placeholder="Q: Name of this Landmark?" />,
      <Button action='/third-check'>Submit</Button>,
      <Button.Link href={second_landmark.clue}>Clue</Button.Link>
    ],
  });
});

app.frame('/third-check', async (c) => {
  const inputText = c.inputText ?? '';

  if (inputText.trim().toLowerCase() === third_landmark.answer.toLowerCase()) {
    return c.res({
      title: 'Propy Quest Game',
      imageAspectRatio: '1:1',
      image: third_landmark.correct_answer,
      intents: [
        <Button action='/4'>Continue</Button>,
      ],
    });
  }

  return c.res({
    title: 'Propy Quest Game',
    imageAspectRatio: '1:1',
    image: third_landmark.wrong_answer,
    intents: [
      <Button action='/3'>Try again</Button>,
      <Button.Link href={third_landmark.clue}>Clue</Button.Link>
    ],
  });
});


app.frame('/4', async (c) => {
  return c.res({
    title: 'Propy Quest Game',
    imageAspectRatio: '1:1',
    image: fourth_landmark.url,
    intents: [
      <TextInput placeholder="Q: Name of this Landmark?" />,
      <Button action='/fourth-check'>Submit</Button>,
      <Button.Link href={fourth_landmark.clue}>Clue</Button.Link>
    ],
  });
});

app.frame('/fourth-check', async (c) => {
  const inputText = c.inputText ?? '';

  if (inputText.trim().toLowerCase() === fourth_landmark.answer.toLowerCase()) {
    return c.res({
      title: 'Propy Quest Game',
      imageAspectRatio: '1:1',
      image: fourth_landmark.correct_answer,
      intents: [
        <Button action='/5'>Continue</Button>,
      ],
    });
  }

  return c.res({
    title: 'Propy Quest Game',
    imageAspectRatio: '1:1',
    image: fourth_landmark.wrong_answer,
    intents: [
      <Button action='/4'>Try again</Button>,
      <Button.Link href={fourth_landmark.clue}>Clue</Button.Link>
    ],
  });
});


app.frame('/5', async (c) => {
  return c.res({
    title: 'Propy Quest Game',
    imageAspectRatio: '1:1',
    image: fifth_landmark.url,
    intents: [
      <TextInput placeholder="Q: Name of this Landmark?" />,
      <Button action='/fifth-check'>Submit</Button>,
      <Button.Link href={fifth_landmark.clue}>Clue</Button.Link>
    ],
  });
});

app.frame('/fifth-check', async (c) => {
  const inputText = c.inputText ?? '';

  if (inputText.trim().toLowerCase() === fifth_landmark.answer.toLowerCase()) {
    return c.res({
      title: 'Propy Quest Game',
      imageAspectRatio: '1:1',
      image: fifth_landmark.correct_answer,
      intents: [
        <Button action='/finish'>Congratulation</Button>,
      ],
    });
  }

  return c.res({
    title: 'Propy Quest Game',
    imageAspectRatio: '1:1',
    image: fifth_landmark.wrong_answer,
    intents: [
      <Button action='/5'>Try again</Button>,
      <Button.Link href={fifth_landmark.clue}>Clue</Button.Link>
    ],
  });
});


app.frame('/finish', async (c) => {
  const { username, pfpUrl } = c.var.interactor || {}

  const embedUrlByUser = `${embedUrl}/share/${username}`;

  const SHARE_BY_USER = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrlByUser)}`;

  return c.res({
    title: 'Propy Quest Game',
    imageAspectRatio: '1:1',
    image: (
      <Box
        alignHorizontal="center" 
        backgroundColor="white"
        justifyContent="center"
        padding="40"
        height="100%"
      >
        <Box flexDirection="row" paddingBottom="256" paddingRight="192" position="absolute">
          <Image
              height="18"
              objectFit="cover"
              src="https://dapp.propy.com/static/media/propy-light-mode.c87a4988ad568844475e67e182195a07.svg"
            />
        </Box>
        <Box
          paddingBottom="160"
          alignHorizontal="center" 
          alignVertical="center"
          position="absolute"
        >
          <Text color="blue" size="18">
            Congratulations!
          </Text>
        </Box>
        <Box
          alignHorizontal="center" 
          alignVertical="center"
          position="absolute"
          paddingBottom="24"
        >
          <img
            height="150"
            width="150"
            src={pfpUrl}
            style={{
              borderRadius: "38%",
              border: "3.5px solid #7559EC",
              objectFit: "cover"
            }}
          />
        </Box>
        <Box
          paddingTop="96"
          alignHorizontal="center" 
          alignVertical="center"
          position="absolute"
        >
          <Text color="purple" size="18">
            @{username}
          </Text>
        </Box>
        <Box
          paddingTop="160"
          alignHorizontal="center" 
          alignVertical="center"
          position="absolute"
        >
          <Text color="blue" size="18">
            You just won $1000 
          </Text>
        </Box>
        <Box
          paddingTop="192"
          alignHorizontal="center" 
          alignVertical="center"
          position="absolute"
        >
          <Text color="purple" size="12">
            [not real money, just for fun]
          </Text>
        </Box>
      </Box>
    ),
    intents: [
      <Button action="/">Play</Button>,
      <Button.Link href={SHARE_BY_USER}>Share</Button.Link>
    ],
  });
});

app.frame('/share/:username', async (c) => {
  const { username } = c.req.param();
  const pfpUrl = c.req.query('pfpUrl');

  const embedUrlByUser = `${embedUrl}/share/${username}`;

  const SHARE_BY_USER = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrlByUser)}`;

  return c.res({
    title: 'Propy Quest Game',
    imageAspectRatio: '1:1',
    image: (
      <Box
        alignHorizontal="center" 
        backgroundColor="white"
        justifyContent="center"
        padding="40"
        height="100%"
      >
        <Box flexDirection="row" paddingBottom="256" paddingRight="192" position="absolute">
          <Image
              height="18"
              objectFit="cover"
              src="https://dapp.propy.com/static/media/propy-light-mode.c87a4988ad568844475e67e182195a07.svg"
            />
        </Box>
        <Box
          paddingBottom="160"
          alignHorizontal="center" 
          alignVertical="center"
          position="absolute"
        >
          <Text color="blue" size="18">
            Congratulations!
          </Text>
        </Box>
        <Box
          alignHorizontal="center" 
          alignVertical="center"
          position="absolute"
          paddingBottom="24"
        >
          <img
            height="150"
            width="150"
            src={pfpUrl}
            style={{
              borderRadius: "38%",
              border: "3.5px solid #7559EC",
              objectFit: "cover"
            }}
          />
        </Box>
        <Box
          paddingTop="96"
          alignHorizontal="center" 
          alignVertical="center"
          position="absolute"
        >
          <Text color="purple" size="18">
            @{username}
          </Text>
        </Box>
        <Box
          paddingTop="160"
          alignHorizontal="center" 
          alignVertical="center"
          position="absolute"
        >
          <Text color="blue" size="18">
            You just won $1000 
          </Text>
        </Box>
        <Box
          paddingTop="192"
          alignHorizontal="center" 
          alignVertical="center"
          position="absolute"
        >
          <Text color="purple" size="12">
            [not real money, just for fun]
          </Text>
        </Box>
      </Box>
    ),
    intents: [
      <Button action="/">Play</Button>,
      <Button.Link href={SHARE_BY_USER}>Share</Button.Link>
    ],
  });
});

// Uncomment this line code to tested on local server
// devtools(app, { serveStatic });

export const GET = handle(app)
export const POST = handle(app)