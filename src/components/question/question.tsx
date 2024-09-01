import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Box,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";

interface QuestionProps {
  question: string;
  answers: string[];
  correct: string;
}

function Question({ question, answers, correct }: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState(answers[0]);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(true);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleChange = (event: React.ChangeEvent<any>) => {
    setSelectedAnswer(event.target.value);
  };

  return (
    <Box key={question} sx={{ m: 4 }}>
      <Grid direction="column">
        <Grid>
          <FormControl error={!isCorrectAnswer} disabled={isDisabled}>
            <FormLabel id={`question-${question}`}>{question}</FormLabel>
            <RadioGroup
              aria-labelledby={`question-${question}`}
              name={`question-${question}`}
              value={selectedAnswer}
              onChange={handleChange}
            >
              {answers.map((answer, index) => (
                <FormControlLabel
                  key={index}
                  value={answer}
                  control={<Radio />}
                  label={answer}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid>
          {showCorrectAnswer && !isCorrectAnswer && (
            <Alert variant="filled" severity="error" sx={{ mt: 2, mb: 2 }}>
              התשובה הנכונה היא: {correct}
            </Alert>
          )}

          {showCorrectAnswer && isCorrectAnswer && (
            <Alert variant="filled" severity="success" sx={{ mt: 2, mb: 2 }}>
              מעולה! תשובה נכונה
            </Alert>
          )}

          <Button
            variant="contained"
            onClick={() => {
              setIsCorrectAnswer(selectedAnswer === correct);
              setShowCorrectAnswer(true);
              setIsDisabled(true);
            }}
          >
            בדוק תשובה
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Question;
