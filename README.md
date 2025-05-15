---
license: apache-2.0
tags:
- generated_from_trainer
datasets:
- food101
metrics:
- accuracy
model-index:
- name: image_classification_food_model
  results:
  - task:
      name: Image Classification
      type: image-classification
    dataset:
      name: food101
      type: food101
      config: default
      split: train[:5000]
      args: default
    metrics:
    - name: Accuracy
      type: accuracy
      value: 0.893
---

<!-- This model card has been generated automatically according to the information the Trainer had access to. You
should probably proofread and complete it, then remove this comment. -->

# image_classification_food_model

This model is a fine-tuned version of [google/vit-base-patch16-224-in21k](https://huggingface.co/google/vit-base-patch16-224-in21k) on the food101 dataset.
It achieves the following results on the evaluation set:
- Loss: 1.6474
- Accuracy: 0.893

## Model description

More information needed

## Intended uses & limitations

More information needed

## Training and evaluation data

More information needed

## Training procedure

### Training hyperparameters

The following hyperparameters were used during training:
- learning_rate: 5e-05
- train_batch_size: 16
- eval_batch_size: 16
- seed: 42
- gradient_accumulation_steps: 4
- total_train_batch_size: 64
- optimizer: Adam with betas=(0.9,0.999) and epsilon=1e-08
- lr_scheduler_type: linear
- lr_scheduler_warmup_ratio: 0.1
- num_epochs: 3

### Training results

| Training Loss | Epoch | Step | Validation Loss | Accuracy |
|:-------------:|:-----:|:----:|:---------------:|:--------:|
| 2.7587        | 0.99  | 62   | 2.5481          | 0.844    |
| 1.8903        | 2.0   | 125  | 1.8096          | 0.874    |
| 1.6502        | 2.98  | 186  | 1.6474          | 0.893    |


### Framework versions

- Transformers 4.30.2
- Pytorch 2.0.1+cpu
- Datasets 2.13.0
- Tokenizers 0.13.3
