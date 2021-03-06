import { useMutation } from "react-query";
import { queryClient } from "../utils/react-query-client";
import { api } from "./api";

const key = "instructions";

/**
 * POST
 */
const createInstructions = (formBody) => {
  return api().post("/instructions", formBody);
};

/**
 * PUT
 */
const editInstructions = ({ id, formBody }) => {
  return api().put(`/instructions/${id}`, formBody);
};

/**
 * DELETE
 */
const deleteInstruction = (id) => {
  return api().delete(`instructions/${id}`);
};

/**
 * HOOKS
 */
export const useCreateInstructions = (recipeId) => {
  return useMutation(createInstructions, {
    onSuccess: () => {
      queryClient.invalidateQueries([key, recipeId]);
    }
  });
};

export const useChangeInstructions = (recipeId) => {
  return useMutation(editInstructions, {
    onSuccess: () => {
      queryClient.invalidateQueries([key, recipeId]);
    }
  });
};

export const useRemoveInstruction = (recipeId) => {
  return useMutation(deleteInstruction, {
    onSuccess: () => {
      queryClient.invalidateQueries([key, recipeId]);
    }
  });
};
