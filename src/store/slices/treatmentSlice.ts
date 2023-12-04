import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PaginationType } from '../../types/generalTypes'
import { TreatmentType } from '../../types/treatment'
import { getTreatments as getT } from '../../services/treatment'

export interface TreatmentState {
  loading: boolean
  treatments: TreatmentType[] | undefined
  selectedTreatment: TreatmentType | undefined
  pagination: PaginationType
}

const initialState: TreatmentState = {
  loading: false,
  treatments: [],
  selectedTreatment: undefined,
  pagination: {
    pagination: {
      current: 1,
      pageSize: 10,
      total: 10
    }
  }
}

export const setTreatments = createAction('treatments/doSetTreatments', (treatments: TreatmentType[]) => {
  return {
    payload: treatments
  }
})

export const getTreatments = createAsyncThunk('treatments/doGetTreatments', async (_, { getState }) => {
  const state = getState()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const res = await getT(state.user.user.id)
  return {
    treatments: res
  }
})
export const setPagination = createAction('treatments/doSetPagination', (pagination: PaginationType) => {
  return {
    payload: pagination
  }
})

export const setSelectedTreatment = createAction('treatments/setTreatment', (treatment: TreatmentType) => {
  return {
    payload: treatment
  }
})

// export const setLoading = createAction('staffs/setLoading', (state))

export const treatmentsSlice = createSlice({
  name: 'treatments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setTreatments, (state, action) => {
      state.treatments = action.payload
    })
    builder.addCase(getTreatments.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getTreatments.fulfilled, (state, action) => {
      state.treatments = action.payload.treatments
      state.loading = false
    })
    builder.addCase(setPagination, (state, action) => {
      state.pagination = action.payload
    })
    builder.addCase(setSelectedTreatment, (state, action) => {
      state.selectedTreatment = action.payload
    })
  }
})

export default treatmentsSlice.reducer
