class MethodWrapper {
    constructor(method) {
        this.method = method;
    }

    setPreprocessInputFn(preprocessFn) {
        this.preprocessInput = preprocessFn;
    }

    setPostprocessOutputFn(postprocessOutput) {
        this.postprocessOutput = postprocessOutput;
    }

    setValidateInputFn(valFn) {
        this.validateInput = valFn;
    }

    setValidateOutputFn(valFn) {
        this.validateOutput = valFn;
    }

    call(args) {
        if (this.validateInput) {
            this.validateInput(args);
        }

        if (this.preprocessInput) {
            args = this.preprocessInput(args);
        }

        let output = this.method(args);

        if (this.postprocessOutput) {
            output = this.postprocessOutput(output);
        }

        if (this.validateOutput) {
            this.validateOutput(output);
        }

        return output;
    }
}

module.exports = MethodWrapper;