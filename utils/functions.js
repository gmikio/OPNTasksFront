export const completeTask = () => {
  // Implement logic to complete the task (POST /api/Tasks/CompleteTask)
  // After completing, clear the current task
  setCurrentTask(null);
};

const cancelTask = async () => {
  try {
    // Inicie o indicador de carregamento
    setIsLoading(true);

    const response = await fetch(
      `http://tasks1-env.eba-tihfzwsy.us-east-1.elasticbeanstalk.com/api/Tasks/CancelTask?idn=${idn}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.ok) {
      // Task cancellation was successful
      setCurrentTask(null); // Clear the current task
      setIsLoading(false); // Pare o indicador de carregamento
    } else {
      setError('Erro ao cancelar a tarefa');
      setIsLoading(false); // Pare o indicador de carregamento
    }
  } catch (e) {
    console.error('Error:', e);
    setError('Erro na conexão com o servidor');
    setIsLoading(false); // Pare o indicador de carregamento em caso de erro
  }
};
